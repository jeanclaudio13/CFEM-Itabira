import scrapy
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import json
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
import os
from collections import defaultdict


class SpiderItabira(scrapy.Spider):
  name = 'spider_itabira'

  def __init__(self, *args, **kwargs):
    super(SpiderItabira, self).__init__(*args, **kwargs) # Aqui poderia ser super().__init__(*args, **kwargs), pensando em escalabilidade mantém-se dessa forma
    self.dados_cfem = self.load_json_data('.\json_output\dados_json.json')
    self.driver = webdriver.Chrome() 

  def load_json_data(self, file_path):
    """Carrega dados de um arquivo JSON. Se o arquivo não existir, cria um arquivo vazio."""
    # Verifica se o arquivo existe
    if not os.path.exists(file_path):
        # Se não existir, cria um arquivo JSON vazio
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump({}, file, ensure_ascii=False, indent=4)  # Cria um dicionário vazio
        print(f"O arquivo {file_path} foi criado.")
    
    # Agora, carrega os dados do arquivo
    with open(file_path, 'r', encoding='utf-8') as file:
      return json.load(file)

  def start_requests(self):
    urls = ['https://servicositabira.govbr.cloud/pronimtb/index.asp?acao=3&item=6']
    for url in urls:
      yield scrapy.Request(url=url, callback=self.parse_fonte_recurso)


  def parse_fonte_recurso(self, response):
    """Nível 1: Filtros Fonte de Recurso"""
    self.driver.get(response.url)
    self.wait_for_page_load()

    # Preenche a página inicial e lê a tabela
    self.preencher_pag_inicial(self.driver)  
    json_data = defaultdict(dict)
    
    """Nível 2: Tabela Fonte de Recurso"""
    self.localizar_cfem_em_fonte_de_recurso(self.driver)
    
    nome_dados = str(f"{ano_selecionado}_tabela_detalhamento_recursos")
    
    if "anos" not in json_data["dados_cfem_itabira"]:
        json_data["dados_cfem_itabira"]["anos"] = {}
    if ano_selecionado not in json_data["dados_cfem_itabira"]["anos"]:
        json_data["dados_cfem_itabira"]["anos"][ano_selecionado] = {}
    json_data["dados_cfem_itabira"]["anos"][ano_selecionado]["tabela_detalhamento_recursos"] = self.ler_tabela(self.driver, nome_dados)

    # Preparação para o detalhamento de recurso
    tipos_cfem = ["cfem_ordinario", "cfem_fega", "cfem_fundesi"]
    
    
    for tipo_cfem in tipos_cfem:
      print(f"Atualmente verificando o tipo: {tipo_cfem}. \n")
      link_infos = self.localizar_cfem_em_detalhamento_fonte_de_recurso(self.driver, tipo_cfem)
      # Itera pelos links e textos retornados
      for link, link_text in link_infos:
        print(f"Processando o link: {link_text} ({link})")
        yield scrapy.Request(url=link, callback=self.parse_natureza, meta={'json_data': json_data, 'tipo_cfem': tipo_cfem, 'natureza': link_text})
       

  def parse_natureza(self, response):
    """Nível 4: Tabela Natureza da Despesa"""

    json_data = response.meta['json_data']
    tipo_cfem = response.meta['tipo_cfem']
    natureza = response.meta['natureza']

    nome_dados = f"{ano_selecionado}_{tipo_cfem}_tabela_naturezas_das_despesas"
    cfem_data = self.ler_tabela(self.driver, nome_dados)

    if tipo_cfem not in json_data["dados_cfem_itabira"]["anos"][ano_selecionado]:
        json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem] = {}
    if 'tabela_naturezas_das_despesas' not in json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem]:
        json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][f"tabela_naturezas_das_despesas"] = []
    json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem]["tabela_naturezas_das_despesas"].append(cfem_data)

    # Itera pelos links da primeira coluna para o próximo nível
    links = self.get_links_primeira_coluna()
    for i, (link, link_text) in enumerate(links):
      if link:  # Verifica se o link não é None
        try:
          link_natureza = self.driver.find_element(By.LINK_TEXT, link_text)
          link_natureza.click()
          self.wait_for_page_load()

          natureza = link_text
          yield scrapy.Request(url=link, callback=self.parse_credores, meta={'json_data': json_data, 'tipo_cfem': tipo_cfem, 'natureza': natureza})
        except Exception as e:
          print(f"Erro ao processar o link: {e}. Retornando e continuando com o próximo.")
          self.driver.back()
          self.wait_for_page_load()
          continue  # Continua para o próximo link

  def parse_credores(self, response):
    """Nível 5: Credores"""
    self.wait_for_page_load()

    json_data = response.meta['json_data']
    tipo_cfem = response.meta['tipo_cfem']
    natureza = response.meta['natureza']

    nome_dados = f"{ano_selecionado}_{tipo_cfem}_{natureza}_credores"
    credor_data = self.ler_tabela(self.driver, nome_dados)

    print(f"\n\n\n CREDOR: \n{credor_data} \n\n\n")

    # Verifica se há informações relevantes
    if 'Não há informações de empenho para o filtro selecionado' in credor_data:
      print(f"Nenhuma informação encontrada para o credor. Retornando à página anterior.")
      self.driver.back()
      self.wait_for_page_load()
      return  # Retorna e não continua o processo para este credor

    # Caso haja dados, continuar o scraping
    links = self.get_links_primeira_coluna()

    for link, link_text in links:
      try:
        credor = link_text
        link_empenho = self.driver.find_element(By.LINK_TEXT, link_text)
        link_empenho.click()
        self.wait_for_page_load()

        if natureza not in json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem]:
          json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza] = {}
        if credor not in json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza]:
          json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza][credor] = []
        json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza][credor].append(credor_data)

        # Continua para o nível de empenhos
        yield scrapy.Request(url=link, callback=self.parse_empenhos, meta={'json_data': json_data, 'tipo_cfem': tipo_cfem, 'natureza': natureza, 'credor': credor})
      
      except Exception as e:
        print(f"Erro ao processar o credor: {e}. Retornando à página anterior.")
        self.driver.back()
        self.wait_for_page_load()
        continue  # Continua para o próximo link

  def parse_empenhos(self, response):
    """Nível 5: Empenhos"""
    self.wait_for_page_load()

    # Extraímos a tabela de empenhos
    json_data = response.meta['json_data']
    tipo_cfem = response.meta['tipo_cfem']
    natureza = response.meta['natureza']
    credor = response.meta['credor']

    empenho_data = self.extract_table_data('tbTabela')

    # Itera pelos links da SEGUNDA coluna para identificar empenhos
    links = self.get_links_numero_empenho(response)
    for link in links:
      empenho = link.text
      if f'{empenho}' not in json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza][credor]["empenhos"]:
        json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza][credor]["empenhos"] = []
      json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza][credor]["empenhos"][empenho].append(empenho_data)
      yield scrapy.Request(url=link, callback=self.get_historico_empenho, meta={'json_data': json_data, 'tipo_cfem': tipo_cfem, 'natureza': natureza, 'credor': credor, 'empenho': empenho})

  def get_historico_empenho(self, response):
    """Nível 6: Histórico Completo do Empenho"""
    self.wait_for_page_load()

    # Extraímos a tabela do histórico completo de empenhos
    json_data = response.meta['json_data']
    tipo_cfem = response.meta['tipo_cfem']
    natureza = response.meta['natureza']
    credor = response.meta['credor']
    empenho = response.meta['empenho']

    historico_data = self.extract_table_data('tbHistorico')
    detalhes_empenho = self.extract_table_data('tbtabela')
    json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza][credor]["empenhos"][empenho]['tabela_historico'] = historico_data
    json_data["dados_cfem_itabira"]["anos"][ano_selecionado][tipo_cfem][natureza][credor]["empenhos"][empenho]['detalhes_empenho'] = detalhes_empenho
    
    # Salvamos o JSON após o último nível
    with open('dados_json.json', 'w', encoding='utf-8') as json_file:
      json.dump(json_data, json_file, ensure_ascii=False, indent=4)

    self.log('JSON atualizado com sucesso. \n\n\n')

  def get_links_primeira_coluna(self):
    """Método para obter todos os links da primeira coluna da tabela e seu texto visível."""
    self.wait_for_page_load()
    table = self.driver.find_element(By.ID, 'tbTabela')
    rows = table.find_elements(By.TAG_NAME, 'tr')

    if not rows:
      print("Tabela vazia, retornando...")  # Log que a tabela está vazia
      self.driver.back()
      return []

    links = []
    for row in rows:
      try:
        link = row.find_element(By.XPATH, './td[1]//a')
        link_text = link.text  # Texto visível do link
        href = link.get_attribute('href')  # URL do link

        # Transforma o link se necessário
        post_url = self.transformar_link(href)
        
        # Guardando ambos o texto e a URL como uma tupla
        if post_url:
          links.append((post_url, link_text))  
      except Exception as e:
        try:
          link = row.find_element(By.XPATH, './td')
          link_text = link.text
          links.append(link_text)
          return links
        except NoSuchElementException:
          print("Nenhum link encontrado na linha, continuando...")
          continue
    return links
    
  def get_links_numero_empenho(self):
    """Método para obter todos os links da segunda coluna da tabela."""
    self.wait_for_page_load()
    table = self.driver.find_element(By.ID, 'tbTabela')
    rows = table.find_elements(By.TAG_NAME, 'tr')
    links = []
    for row in rows:
      try:
        link = row.find_element(By.XPATH, './td[2]//a')
        href = link.get_attribute('href')  # Obtém a URL do link

        # Transforma o link se necessário
        post_url = self.transformar_link(href) if href.startswith("javascript:") else href
        
        if post_url:  # Verifica se o link transformado não é None
          links.append(post_url)  # Adiciona o link à lista
      except Exception as e:
        print(f"Erro ao processar a linha: {e}")  # Log de erro mais informativo
        continue
    return links

  def extract_table_data(self, idTabela):
    """Método para extrair a tabela da página usando Selenium."""
    table = self.driver.find_element(By.ID, idTabela)
    rows = table.find_elements(By.TAG_NAME, 'tr')
    table_data = []
    for row in rows:
        cols = row.find_elements(By.TAG_NAME, 'td')
        row_data = [col.text for col in cols]
        table_data.append(row_data)
    return table_data

  def closed(self, reason):
    """Fecha o WebDriver quando o processo for finalizado."""
    self.driver.quit()


  ###########################################################################################
  ano_selecionado = None

  def preencher_pag_inicial(self, driver):
    global ano_selecionado
    ano_selecionado = input('Qual ano entre 2018 e 2024 deseja raspar? \n\n')
    print('Preenchendo dados da página inicial... \n\n')

    # Dicionário de anos
    anos_dict = {
        '2013': '2013|DW_LC131_FC_9|',
        '2014': '2014|DW_LC131_FC_8|',
        '2015': '2015|DW_LC131_FC_7|',
        '2016': '2016|DW_LC131_FC_6|',
        '2017': '2017|DW_LC131_FC_5|',
        '2018': '2018|DW_LC131_FC_4|',
        '2019': '2019|DW_LC131_FC_3|',
        '2020': '2020|DW_LC131_FC_2|',
        '2021': '2021|DW_LC131_FC_1|',
        '2022': '2022|DW_LC131_FC_0|',
        '2023': '2023|DW_LC131_FC_10|',
        '2024': '2024|DW_LC131_FC_11|'
    }

    if ano_selecionado in anos_dict:
        select_ano = driver.find_element(By.ID, 'cmbAno')
        select = Select(select_ano)
        cmbAno = anos_dict[ano_selecionado]
        select.select_by_value(cmbAno)
    else:
        print(f"Ano inválido: {ano_selecionado}. Por favor, escolha entre 2018 e 2024.")

    # Data inicial
    data_inicial = driver.find_element(By.ID, "txtDataInicial")
    data_inicial.clear()
    data_inicial.send_keys(f"0101{ano_selecionado}")

    # Data final 
    data_final = driver.find_element(By.ID, "txtDataFinal")
    data_final.clear()
    data_final.send_keys(f"3112{ano_selecionado}")


    # Unidade Gestora
    select_element = driver.find_element(By.ID, 'cmbUnidadeGestora')
    select = Select(select_element)
    select.select_by_value('0')  # Selecionar a opção com valor '0'

    # Clicar no botão "Gerar"
    element = driver.find_element(By.ID, "confirma")
    element.click()
    self.wait_for_page_load()
    print("Página inicial preenchida! \n \n \n \n \n")


  def ler_tabela(self, driver, nome_dados):

    wait = WebDriverWait(driver, 10)  # Definindo o wait para uso

    html_table = wait.until(EC.presence_of_element_located((By.ID, 'tbTabela')))
    
    # Passar o objeto html_table para BeautifulSoup
    soup = BeautifulSoup(html_table.get_attribute('outerHTML'), 'html.parser')
    
    # Encontra o elemento da tabela
    table = soup.find('table')
    
    # Inicializa dicionário vazio
    table_data = {}
    
    # Extrai headers
    header_row = table.find_all('tr')[1]  # Assumindo a segunda linha como header
    headers = header_row.find_all('th')
    headers_text = [header.text.strip().replace('.', '') for header in headers]  # Remove pontos
    
    # Extrai dados da tabela
    for row in table.find_all('tr')[2:]:  # Pula headers
        cells = row.find_all('td')
        item = cells[0].get_text().strip().replace('.', '')  # Remove pontos
        # Remove todos os pontos
        cells_text = [cell.get_text().strip().replace('.', '') for cell in cells[1:]]
        data = {
            headers_text[i+1]: cells_text[i] for i in range(len(cells_text))
        }
        table_data[item] = data


    # # Adiciona os dados ao dicionário global
    # if nome_dados not in dados_tabelas:
    #     dados_tabelas[nome_dados] = table_data
    # else:
    #     dados_tabelas[nome_dados].update(table_data)
    
    # Converte dados para JSON identado
    json_data = json.dumps(table_data, indent=4, ensure_ascii=False)
    
    # Lidando com diretório
    directory = 'json_output'
    if not os.path.exists(directory):
        os.makedirs(directory)
    file_path = os.path.join(directory, f'{nome_dados}.json')
    
    # Salvando JSON em arquivo
    with open(file_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json_data)
    print(f'Dados salvos em: {file_path}')

    return table_data


  def localizar_cfem_em_fonte_de_recurso(self, driver):
    print("Localizando CFEM na lista de Fonte de Recursos... \n \n")

    self.wait_for_page_load()

    # Lista de textos possíveis para o link, adaptando para os anos
    textos_possiveis = [
      "Recursos Ordinários",
      "Transf União Referente à Compensação Financeira de Recursos Minerais",
      "Transf União CFEM",
      "CFEM"        
      # Adicione outras variações de texto que você espera encontrar
    ]

    link_cfem = None  # Inicializa a variável

    for texto in textos_possiveis:
        try:
            print(f"Tentando texto: {texto}")
            # Pausa até que o usuário pressione Enter
            # input("Pressione Enter para continuar...")

            # Tenta localizar o link pelo texto
            link_cfem = driver.find_element(By.LINK_TEXT, texto)
            break  # Sai do loop se o link for encontrado

        except NoSuchElementException:
            print(f"Link com o texto '{texto}' não encontrado, tentando próximo. \n")
            continue  # Tenta o próximo texto na lista

    if link_cfem:
        link_cfem.click()  # Clica no link encontrado
        self.wait_for_page_load()
        print("Fonte CFEM encontrada! \n \n \n \n \n")
    else:
      raise Exception("Link CFEM não encontrado. \n \n \n \n \n")


  def localizar_cfem_em_detalhamento_fonte_de_recurso(self, driver, tipo_recurso):
      # Dicionário que associa tipos de recurso a suas listas de textos
      textos_por_tipo = {
          "cfem_ordinario": [
              "000.0102 - Rec. Ordinários - CEFEM",
              "000.0911 - Recurso Ordinário - CFEM",
              # Adicione outras variações de texto que você espera encontrar
          ],
          "cfem_fega": [
              "000.0104 - Rec. Ordinários FEGA",
              "000.0912 - Recurso Ordinário do Fundo Especial de Gestão Ambiental - FEGA",
              # Adicione outras variações de texto que você espera encontrar
          ],
          "cfem_fundesi": [
              "000.0105 - Rec. Ordinários Fundesi",
              "000.0913 - Recurso Ordinário do Fundo de Desenvolvimento Econômico de Itabira - FUNDESI",
              # Adicione outras variações de texto que você espera encontrar
          ]
      }

      # Verifica se o tipo de recurso existe
      if tipo_recurso not in textos_por_tipo:
          raise ValueError(f"Tipo de recurso '{tipo_recurso}' não é válido. Use: {list(textos_por_tipo.keys())}")

      # Obtém a lista de textos correspondente ao tipo de recurso
      textos = textos_por_tipo[tipo_recurso]
      links_encontrados = []  # Lista para armazenar links encontrados

      # Tenta encontrar os links com base nos textos fornecidos
      for texto in textos:
          try:
              # Tenta localizar o link pelo texto
              link_cfem = driver.find_element(By.LINK_TEXT, texto)
              link_text = link_cfem.text
              href = link_cfem.get_attribute('href')  # Obtemos a URL do link
              
              post_url = self.transformar_link(href) if href.startswith("javascript:") else href

              # Clica no link encontrado
              link_cfem.click()
              self.wait_for_page_load()

              # Adiciona o link e o texto à lista de links encontrados
              links_encontrados.append((post_url, link_text))  
          except NoSuchElementException:
              continue  # Tenta o próximo texto na lista

      if not links_encontrados:
          raise Exception("Nenhum link CFEM (em Detalhamento) encontrado. \n\n\n")

      return links_encontrados  # Retorna a lista de links encontrados


  def wait_for_page_load(self):
    #self.driver.get(response.url)
    wait = WebDriverWait(self.driver, 10)
    wait.until(EC.presence_of_element_located((By.TAG_NAME, 'body')))

  def transformar_link(self, link):
    """Transforma o link javascript em uma URL utilizável para requisições."""
    if link.startswith("javascript:"):
      link = link[len("javascript:"):]

    # Acessa o conteúdo entre parênteses
    start_index = link.find("('") + 2  # Pula o '(
    end_index = link.find("')")  # Ponto de fechamento
    if start_index == -1 or end_index == -1:
      print(f"Link inválido: {link}")
      return None  # Retorna None se o link não puder ser transformado

    inner_link = link[start_index:end_index]

    # Monta a nova URL
    base_url = "https://servicositabira.govbr.cloud/pronimtb/acao.asp"
    action = "IncluirHistorico"
    
    # Extrai os parâmetros da inner_link
    parameters = inner_link[inner_link.find("/"):].replace("%3D", "=").replace("%26", "&").replace("'", "")
    
    # Monta a URL do POST
    post_url = f"{base_url}?acao={action}&visao=3&produto=3&nivel=&link={parameters}"
    
    return post_url


