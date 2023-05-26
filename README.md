# English

# Case Study:  
### Impact of File Reading Methods on Microservices and Horizontal Scalability

<br />

## Introduction:
In this case study, we will explore the differences between two approaches to reading files and how they can affect microservices, potentially leading to failures even with horizontal scalability. We will examine two code snippets: read-and-publish-zip-mem.ts, which utilizes the entire memory to read the file, and read-and-publish-zip.ts, which optimizes the process and reads the file line by line, thus avoiding excessive memory usage. Let's delve into the details and understand their implications for microservices.

## Scenario:
Imagine a system where multiple microservices collaborate to process and analyze large volumes of data stored in zip files. These microservices are designed to scale horizontally to handle increased workloads efficiently. The focus here is on the file reading process within these microservices and how it impacts their overall performance and stability.

<strong>Approach 1</strong>: Reading Entire File into Memory (read-and-publish-zip-mem.ts)
The read-and-publish-zip-mem.ts file demonstrates an approach that loads the entire zip file into memory using the 'adm-zip' library. It extracts the first entry and converts its content into a string. The string is then split into individual lines for further processing. While this method might be straightforward, it poses challenges when dealing with large zip files. Reading the entire file into memory can lead to high memory consumption, especially when multiple microservices concurrently process numerous large files. This approach may not be scalable and can result in memory exhaustion, potentially causing microservices to crash or slow down significantly.

<strong>Approach 2</strong>: Line-by-Line Reading with Stream (read-and-publish-zip.ts)
The read-and-publish-zip.ts file presents an optimized approach using the 'yauzl' library. It employs a line-by-line reading technique using stream-based operations. The zip file is opened with the 'lazyEntries' option, which enables efficient entry-by-entry traversal without loading the entire file into memory. Upon encountering an entry, the code checks if it is a directory or a file. If it is a file, a read stream is opened, and the file is read chunk by chunk. Each chunk is converted to a line of text for processing. By adopting this method, the microservices can avoid excessive memory usage and handle large files efficiently. This approach allows for better scalability, as each microservice can process files independently without overloading the memory resources.

<strong>Impact on Microservices and Horizontal Scalability</strong>:
The choice of file reading method has a direct impact on the performance and stability of microservices, especially in a horizontally scalable environment. Let's consider the implications:

<strong>Memory Utilization:</strong> The read-and-publish-zip-mem.ts approach that loads the entire file into memory can lead to increased memory utilization, limiting the number of concurrent file processing tasks a microservice can handle. As the workload increases, the microservice's memory usage surges, eventually causing it to crash or experience significant performance degradation.

<strong>Scalability</strong>: The read-and-publish-zip.ts approach, which reads files line by line, is more scalable. It allows microservices to process files independently and in parallel, without being constrained by memory limitations. Each microservice can handle multiple files simultaneously, facilitating horizontal scalability.

<strong>Fault Tolerance</strong>: The read-and-publish-zip-mem.ts approach lacks fault tolerance as it relies on loading the entire file into memory. If a file is corrupted or exceptionally large, it can lead to failures and impact the stability of the entire microservice. The read-and-publish-zip.ts approach, with its stream-based reading, offers better fault tolerance. If one file encounters an issue, it does not affect the processing of other files.

## Conclusion:
Choosing an appropriate file reading method is crucial for the performance, scalability, and stability of microservices, particularly when dealing with large volumes of data stored in zip files. The read-and-publish-zip-mem.ts approach, which loads the entire file into memory, may be suitable for smaller files or scenarios where memory usage is not a concern. However, it poses limitations in terms of scalability and fault tolerance, potentially causing microservices to fail or slow down when dealing with larger files or increased workloads.

On the other hand, the read-and-publish-zip.ts approach, which reads files line by line using streams, provides better scalability and fault tolerance. It allows microservices to process files independently and efficiently, even with large volumes of data. This approach is well-suited for horizontally scalable environments, where microservices need to handle multiple files concurrently without overloading memory resources.

In conclusion, by adopting the optimized file reading method using streams, microservices can maintain their performance, scalability, and stability, ensuring smooth operations even under heavy workloads. It is crucial for system architects and developers to carefully consider the file reading approach to maximize the efficiency and reliability of microservices within the context of horizontal scalability.

<br />

# Portugues

# Estudo de caso:
### Impacto dos métodos de leitura de arquivos em microsserviços e escalabilidade horizontal

<br />

## Introdução:
Neste estudo de caso, exploraremos as diferenças entre duas abordagens de leitura de arquivos e como elas podem afetar os microsserviços, podendo levar a falhas mesmo com escalabilidade horizontal. Examinaremos dois trechos de código: read-and-publish-zip-mem.ts, que utiliza toda a memória para ler o arquivo, e read-and-publish-zip.ts, que otimiza o processo e lê a linha do arquivo por linha, evitando assim o uso excessivo de memória. Vamos nos aprofundar nos detalhes e entender suas implicações para os microsserviços.

## Cenário:
Imagine um sistema onde vários microsserviços colaboram para processar e analisar grandes volumes de dados armazenados em arquivos zip. Esses microsserviços são projetados para escalar horizontalmente para lidar com o aumento das cargas de trabalho com eficiência. O foco aqui é o processo de leitura de arquivos nesses microsserviços e como isso afeta seu desempenho e estabilidade gerais.

<strong>Abordagem 1</strong>: Lendo o arquivo inteiro na memória (read-and-publish-zip-mem.ts)
O arquivo read-and-publish-zip-mem.ts demonstra uma abordagem que carrega todo o arquivo zip na memória usando a biblioteca 'adm-zip'. Ele extrai a primeira entrada e converte seu conteúdo em uma string. A string é então dividida em linhas individuais para processamento adicional. Embora esse método possa ser simples, ele apresenta desafios ao lidar com arquivos zip grandes. Ler o arquivo inteiro na memória pode levar a um alto consumo de memória, especialmente quando vários microsserviços processam vários arquivos grandes simultaneamente. Essa abordagem pode não ser escalável e pode resultar no esgotamento da memória, podendo causar falhas ou lentidão significativa nos microsserviços.

<strong>Abordagem 2</strong>: Leitura linha por linha com fluxo (read-and-publish-zip.ts)
O arquivo read-and-publish-zip.ts apresenta uma abordagem otimizada usando a biblioteca 'yauzl'. Ele emprega uma técnica de leitura linha por linha usando operações baseadas em fluxo. O arquivo zip é aberto com a opção 'lazyEntries', que permite passagem entrada por entrada eficiente sem carregar o arquivo inteiro na memória. Ao encontrar uma entrada, o código verifica se é um diretório ou um arquivo. Se for um arquivo, um fluxo de leitura é aberto e o arquivo é lido pedaço por pedaço. Cada pedaço é convertido em uma linha de texto para processamento. Ao adotar esse método, os microsserviços podem evitar o uso excessivo de memória e lidar com arquivos grandes com eficiência. Essa abordagem permite melhor escalabilidade, pois cada microsserviço pode processar arquivos de forma independente sem sobrecarregar os recursos de memória.

<strong>Impacto nos microsserviços e escalabilidade horizontal</strong>:
A escolha do método de leitura de arquivos tem impacto direto no desempenho e na estabilidade dos microsserviços, principalmente em um ambiente escalável horizontalmente. Vamos considerar as implicações:

<strong>Utilização da memória:</strong> a abordagem read-and-publish-zip-mem.ts que carrega o arquivo inteiro na memória pode aumentar a utilização da memória, limitando o número de tarefas simultâneas de processamento de arquivo que um microsserviço pode manipular. À medida que a carga de trabalho aumenta, o uso de memória do microsserviço aumenta, eventualmente causando falhas ou degradação significativa do desempenho.

<strong>Escalabilidade</strong>: a abordagem read-and-publish-zip.ts, que lê arquivos linha por linha, é mais escalável. Ele permite que os microsserviços processem arquivos de forma independente e em paralelo, sem serem limitados por limitações de memória. Cada microsserviço pode lidar com vários arquivos simultaneamente, facilitando a escalabilidade horizontal.

<strong>Tolerância a falhas</strong>: a abordagem read-and-publish-zip-mem.ts carece de tolerância a falhas, pois depende do carregamento de todo o arquivo na memória. Se um arquivo estiver corrompido ou for excepcionalmente grande, pode levar a falhas e afetar a estabilidade de todo o microsserviço. A abordagem read-and-publish-zip.ts, com sua leitura baseada em fluxo, oferece melhor tolerância a falhas. Se um arquivo encontrar um problema, isso não afetará o processamento de outros arquivos.

## Conclusão:
A escolha de um método de leitura de arquivo apropriado é crucial para o desempenho, escalabilidade e estabilidade dos microsserviços, principalmente ao lidar com grandes volumes de dados armazenados em arquivos zip. A abordagem read-and-publish-zip-mem.ts, que carrega o arquivo inteiro na memória, pode ser adequada para arquivos menores ou cenários em que o uso da memória não é uma preocupação. No entanto, apresenta limitações em termos de escalabilidade e tolerância a falhas, podendo causar falhas ou lentidão nos microsserviços ao lidar com arquivos maiores ou cargas de trabalho maiores.

Por outro lado, a abordagem read-and-publish-zip.ts, que lê arquivos linha por linha usando fluxos, fornece melhor escalabilidade e tolerância a falhas. Ele permite que os microsserviços processem arquivos de forma independente e eficiente, mesmo com grandes volumes de dados. Essa abordagem é adequada para ambientes escalonáveis horizontalmente, onde os microsserviços precisam lidar com vários arquivos simultaneamente sem sobrecarregar os recursos de memória.

Concluindo, ao adotar o método otimizado de leitura de arquivos usando streams, os microsserviços podem manter seu desempenho, escalabilidade e estabilidade, garantindo operações suaves mesmo sob cargas de trabalho pesadas. É crucial que os arquitetos e desenvolvedores de sistemas considerem cuidadosamente a abordagem de leitura de arquivos para maximizar a eficiência e a confiabilidade dos microsserviços no contexto da escalabilidade horizontal.