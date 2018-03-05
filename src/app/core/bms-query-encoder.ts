import { URLSearchParams, QueryEncoder } from '@angular/http';
export class BmsQueryEncoder extends QueryEncoder {
    encodeKey(k: string): string {
        return this.bmsEncodingFunction(k);
    }
    encodeValue(v: string): string {
        return this.bmsEncodingFunction(v);
    }
    bmsEncodingFunction(string: string) {
        return string.replace(/\+/g, '%2B');
    }
}

