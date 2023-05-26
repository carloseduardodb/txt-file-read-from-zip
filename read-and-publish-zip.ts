import * as yauzl from 'yauzl';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadAndPublishZip {
  async call(fileData: {
    exchange: string;
    routingKey: string;
    volume: string;
  }) {
    yauzl.open(fileData.volume, { lazyEntries: true }, (err, zipFile) => {
      if (err) {
        throw new Error(`Erro ao abrir o arquivo zip: ${err}`);
      }
      zipFile.readEntry();
      zipFile.on('entry', (entry) => {
        if (/\/$/.test(entry.fileName)) {
          zipFile.readEntry();
        } else {
          zipFile.openReadStream(entry, (err, readStream) => {
            if (err) {
              throw new Error(
                `Erro ao abrir o fluxo de leitura para o arquivo dentro do zip: ${err}`,
              );
            }
            readStream.on('data', (chunk) => {
              const line = chunk.toString('utf8');
              console.log('line: ', line);
            });
            readStream.on('end', () => {
              zipFile.readEntry();
            });
          });
        }
      });

      zipFile.on('end', () => {
        zipFile.close();
      });
    });
  }
}
