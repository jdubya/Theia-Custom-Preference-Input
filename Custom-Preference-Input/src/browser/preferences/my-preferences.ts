import { interfaces } from 'inversify';
import { createPreferenceProxy, PreferenceProxy, PreferenceService, PreferenceContribution, PreferenceSchema} from '@theia/core/lib/browser/preferences';

export const CustomPreferenceConfigSchema: PreferenceSchema = {
    'type': 'object',
    'properties': {
        'aaa.stringPref': {
            'type': 'string',
        },
        'aaa.stringPrefToUpperCase': {
            'type': 'string',
            'customInput': 'toUpperCase'
        },
    }
};

export interface CustomPreferenceConfiguration {
    'aaa.stringPref': string,
    'aaa.stringPrefToUpperCase': string
}

export const CustomPreferences = Symbol('CustomPreferences');
export type CustomPreferences = PreferenceProxy<CustomPreferenceConfiguration>;

export function createCustomPreferences(preferences: PreferenceService): CustomPreferences {
    return createPreferenceProxy(preferences, CustomPreferenceConfigSchema);
}

export function bindCustomPreferences(bind: interfaces.Bind): void {
    bind(CustomPreferences).toDynamicValue(ctx => {
        const preferences = ctx.container.get<PreferenceService>(PreferenceService);
        return createCustomPreferences(preferences);
    });

    bind(PreferenceContribution).toConstantValue({ schema: CustomPreferenceConfigSchema });
}