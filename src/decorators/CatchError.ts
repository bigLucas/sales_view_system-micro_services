/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ProxyResultBuilder } from '../core/ProxyResultBuilder';

export function CatchError(): any {
    return (
        _: Record<string, unknown>,
        __: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        const originalValue = descriptor.value;
        descriptor.value = async function (...args: any[]): Promise<any> {
            try {
                return await originalValue.apply(this, args);
            } catch (error) {
                if (error.status) {
                    return (error as ProxyResultBuilder).build();
                }
                throw error;
            }
        };
        return descriptor;
    };
}
