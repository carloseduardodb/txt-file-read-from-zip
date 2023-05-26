import * as yauzl from 'yauzl';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadAndPublishZip {
  /**
   * Asynchronously calls a function to read a zip file and print its contents to the console.
   * @param fileData An object containing information about the zip file to read.
   * @param fileData.exchange The exchange to read from.
   * @param fileData.routingKey The routing key to use.
   * @param fileData.volume The path to the zip file to read.
   */
  async call(fileData: {
    exchange: string;
    routingKey: string;
    volume: string;
  }) {
    // Open the zip file with lazy entries to avoid loading everything into memory at once.
    yauzl.open(fileData.volume, { lazyEntries: true }, (err, zipFile) => {
      if (err) {
        // Throw an error if the file couldn't be opened.
        throw new Error(`Erro ao abrir o arquivo zip: ${err}`);
      }

      // Read the first entry in the zip file.
      zipFile.readEntry();

      // When a new entry is found in the zip file, check if it's a file or a directory.
      zipFile.on('entry', (entry) => {
        if (/\/$/.test(entry.fileName)) {
          // If the entry is a directory, read the next entry.
          zipFile.readEntry();
        } else {
          // If the entry is a file, open a read stream to it.
          zipFile.openReadStream(entry, (err, readStream) => {
            if (err) {
              // Throw an error if the read stream couldn't be opened.
              throw new Error(
                `Erro ao abrir o fluxo de leitura para o arquivo dentro do zip: ${err}`,
              );
            }

            // When data is received from the read stream, print it to the console.
            readStream.on('data', (chunk) => {
              const line = chunk.toString('utf8');
              line;
            });

            // When the read stream ends, read the next entry in the zip file.
            readStream.on('end', () => {
              zipFile.readEntry();
            });
          });
        }
      });

      // When there are no more entries in the zip file, close the zip file.
      zipFile.on('end', () => {
        zipFile.close();
      });
    });
  }
}
