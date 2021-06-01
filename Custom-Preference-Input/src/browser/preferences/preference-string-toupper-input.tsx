import * as React from '@theia/core/shared/react';
import { Preference } from '@theia/preferences/lib/browser/util/preference-types';

interface PreferenceStringToUpperInputProps {
    preferenceDisplayNode: Preference.NodeWithValueInSingleScope;
    setPreference(preferenceName: string, preferenceValue: string): void;
}

export const PreferenceStringToUpperInput: React.FC<PreferenceStringToUpperInputProps> = ({ preferenceDisplayNode, setPreference }) => {
    const { id } = preferenceDisplayNode;
    const { data, value } = preferenceDisplayNode.preference;

    const externalValue = (value !== undefined ? value : data.defaultValue) || '';

    const [currentTimeout, setCurrentTimetout] = React.useState<number>(0);
    const [currentValue, setCurrentValue] = React.useState<string>(externalValue);

    React.useEffect(() => {
        setCurrentValue(externalValue);
    }, [externalValue]);

    const onChange = React.useCallback(e => {
        const { value: newValue } = e.target;
        clearTimeout(currentTimeout);
        const newTimeout = setTimeout(() => setPreference(id, newValue), 750);
        setCurrentTimetout(Number(newTimeout));
        setCurrentValue(newValue.toUpperCase());
    }, [currentTimeout]);

    return (
        <input
            type="text"
            className="theia-input"
            value={currentValue}
            onChange={onChange}
            data-preference-id={id}
        />
    );
};