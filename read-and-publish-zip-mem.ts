import * as AdmZip from 'adm-zip';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ReadAndPublishZipMem {
  async call(fileData: {
    exchange: string;
    routingKey: string;
    volume: string;
  }) {
    const zip = new AdmZip(fileData.volume);
    const zipEntries = zip.getEntries();
    const firstZipEntry = zipEntries[0];
    const zipEntryContent = firstZipEntry.getData().toString('utf8');
    const zipEntryLines = zipEntryContent.split(/\r?\n|\r|\n/g);

    for (let i = 0; i < zipEntryLines.length; i++) {
      try {
        if (!zipEntryLines[i]) {
          continue;
        }
        const jsonData: unknown = JSON.parse(zipEntryLines[i]);
        jsonData;
      } catch (error) {
        Logger.error(error.message);
      }
    }
  }
}
