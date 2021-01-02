import * as dayjs from 'dayjs';
import { ElectronicDataInterchange } from '../models/ElectronicDataInterchange';
import { PossibleTypesEnum } from '../models/enums/PossibleTypesEnum';
import { Header } from '../models/Header';
import { Sale } from '../models/Sale';
import { Tail } from '../models/Tail';
import {
    ElectronicDataInterchangeSchema,
    SchemaItem,
} from '../models/ElectronicDataInterchangeSchema';

export class EDI {
    private static DATE_FORMAT = 'YYYY-MM-DD';
    private static DATE_FORMAT_WITHOUT_TIMEZONE = 'YYYY-MM-DDTHH:mm:ss';
    private static DATE_TIME_COMPLEMENT = 'T00:00:00';
    private static DELIMITER = ';';

    public static parse(fileContent: string): ElectronicDataInterchange {
        const lines = fileContent.split('\n');
        const electronicDataInterchange = new ElectronicDataInterchange();
        lines.map((line) => {
            const registerId = line[0];
            const parsedLine = this.parseLineWithRegister(line);

            if (registerId === 'H') {
                electronicDataInterchange.header = parsedLine as Header;
            } else if (registerId === 'S') {
                electronicDataInterchange.sales.push(parsedLine as Sale);
            } else if (registerId === 'T') {
                electronicDataInterchange.tail = parsedLine as Tail;
            }
        });
        return electronicDataInterchange;
    }

    public static stringfy(object: ElectronicDataInterchange): string {
        const header = this.toFormattedString(object.header);
        const sales = object.sales.map((sale) => this.toFormattedString(sale));
        const tail = this.toFormattedString(object.tail);
        return `${header}\n` + `${sales.join('\n')}${sales.length > 0 ? '\n' : ''}` + `${tail}\n`;
    }

    private static parseLineWithRegister(line: string): Header | Sale | Tail {
        const parsedLine = {};
        const fieldContent = line.split(this.DELIMITER);
        fieldContent.splice(fieldContent.length - 1);
        // todo: validate if the field has the right content
        const identifier = fieldContent[0] as 'H' | 'S' | 'T';

        fieldContent.map((field, index) => {
            const schema = ElectronicDataInterchangeSchema[identifier][index] as SchemaItem;
            parsedLine[schema.name] = this.chooseRightParse(field, schema);
        });
        return parsedLine as Header | Sale | Tail;
    }

    private static chooseRightParse(
        field: string,
        schema: SchemaItem
    ): number | string | Date | undefined {
        if (schema.type === PossibleTypesEnum.INTEGER) {
            return parseInt(field, 10);
        }
        if (schema.type === PossibleTypesEnum.DECIMAL) {
            return parseFloat(field);
        }
        if (schema.type === PossibleTypesEnum.STRING) {
            return ('' + field).trim();
        }
        if (schema.type === PossibleTypesEnum.DATE_WITH_TIME) {
            return new Date(field);
        }
        if (schema.type === PossibleTypesEnum.DATE_WITHOUT_TIME) {
            return new Date(`${field}${this.DATE_TIME_COMPLEMENT}`);
        }
        return undefined;
    }

    private static toFormattedString(property: Header | Sale | Tail): string {
        const schema = ElectronicDataInterchangeSchema[property.identifier];
        let formattedString = '';
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let key = 0; key < Object.entries(schema).length; key++) {
            const item = schema[key] as SchemaItem;
            const content = property[item.name] as string | Date | number;
            if (typeof content !== 'string' && typeof content !== 'number') {
                const dateFormat =
                    property.identifier === 'S'
                        ? this.DATE_FORMAT_WITHOUT_TIMEZONE
                        : this.DATE_FORMAT;
                formattedString += `${dayjs(content).format(dateFormat)}${this.DELIMITER}`;
            } else {
                formattedString += `${content}${this.DELIMITER}`;
            }
        }
        return formattedString;
    }
}
