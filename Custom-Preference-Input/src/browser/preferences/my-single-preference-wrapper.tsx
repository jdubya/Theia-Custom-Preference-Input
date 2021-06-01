import { injectable } from 'inversify';
import * as React from '@theia/core/shared/react';
import { SinglePreferenceWrapper } from '@theia/preferences/lib/browser/views/components/single-preference-wrapper';
import { Preference } from '@theia/preferences/lib/browser/util/preference-types';
import { PreferenceSelectInput, PreferenceBooleanInput, PreferenceStringInput, PreferenceNumberInput, PreferenceJSONInput, PreferenceArrayInput } from '@theia/preferences/lib/browser/views/components/';
import { PreferenceStringToUpperInput } from './preference-string-toupper-input';

@injectable()
export class MySinglePreferenceWrapper extends SinglePreferenceWrapper {

    getInputType = (preferenceDisplayNode: Preference.NodeWithValueInSingleScope): React.ReactNode => {
        const { type, items } = preferenceDisplayNode.preference.data;
        if (preferenceDisplayNode.preference.data.enum) {
            return <PreferenceSelectInput
                preferenceDisplayNode={preferenceDisplayNode}
                setPreference={this.setPreference}
            />;
        } if (type === 'boolean') {
            return <PreferenceBooleanInput
                preferenceDisplayNode={preferenceDisplayNode}
                setPreference={this.setPreference}
            />;
        } if (type === 'string' && preferenceDisplayNode.preference.data.customInput
            && preferenceDisplayNode.preference.data.customInput === 'toUpperCase') {
            return <PreferenceStringToUpperInput
                preferenceDisplayNode={preferenceDisplayNode}
                setPreference={this.setPreference}
            />;
        } if (type === 'string') {
            return <PreferenceStringInput
                preferenceDisplayNode={preferenceDisplayNode}
                setPreference={this.setPreference}
            />;
        } if (type === 'number' || type === 'integer') {
            return <PreferenceNumberInput
                preferenceDisplayNode={preferenceDisplayNode}
                setPreference={this.setPreference}
            />;
        } if (type === 'array') {
            if (items && items.type === 'string') {
                return <PreferenceArrayInput
                    preferenceDisplayNode={preferenceDisplayNode}
                    setPreference={this.setPreference}
                />;
            }
            return <PreferenceJSONInput
                preferenceDisplayNode={preferenceDisplayNode}
                onClick={this.openJSONForCurrentPreference}
            />;
        } if (type === 'object') {
            return <PreferenceJSONInput
                preferenceDisplayNode={preferenceDisplayNode}
                onClick={this.openJSONForCurrentPreference}
            />;
        }
        return <PreferenceJSONInput
            preferenceDisplayNode={preferenceDisplayNode}
            onClick={this.openJSONForCurrentPreference}
        />;
    };

}