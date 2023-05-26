import * as AdmZip from 'adm-zip';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ReadAndPublishZipMem {
  /**
   * Parses a zip file containing JSON data line by line.
   * @param fileData An object containing information about the zip file to parse.
   * @param fileData.exchange The exchange used to route the data.
   * @param fileData.routingKey The routing key used to route the data.
   * @param fileData.volume The path to the zip file containing data to parse.
   */
  async call(fileData: {
    exchange: string;
    routingKey: string;
    volume: string;
  }) {
    // Load the zip file
    const zip = new AdmZip(fileData.volume);
    const zipEntries = zip.getEntries();

    // Parse the first entry in the zip file
    const firstZipEntry = zipEntries[0];
    const zipEntryContent = firstZipEntry.getData().toString('utf8');

    // Split the entry into individual lines
    const zipEntryLines = zipEntryContent.split(/\r?\n|\r|\n/g);

    // Loop through each line and parse the JSON data
    for (let i = 0; i < zipEntryLines.length; i++) {
      try {
        if (!zipEntryLines[i]) {
          continue;
        }
        const jsonData: unknown = JSON.parse(zipEntryLines[i]);
        jsonData;
      } catch (error) {
        // Log any errors that occur during parsing
        Logger.error(error.message);
      }
    }
  }
}
