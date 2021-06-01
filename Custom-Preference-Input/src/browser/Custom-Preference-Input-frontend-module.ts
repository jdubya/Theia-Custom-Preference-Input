/**
 * Generated using theia-extension-generator
 */
import { CustomPreferenceInputCommandContribution, CustomPreferenceInputMenuContribution } from './Custom-Preference-Input-contribution';
import {
    CommandContribution,
    MenuContribution
} from "@theia/core/lib/common";
import { ContainerModule } from "inversify";
import { bindCustomPreferences } from './preferences/my-preferences';

// import { SinglePreferenceWrapper } from '@theia/preferences/lib/browser/views/components/single-preference-wrapper';
// import { MySinglePreferenceWrapper } from './preferences/my-single-preference-wrapper';

export default new ContainerModule((bind, rebind) => {
    // add your contribution bindings here
    bind(CommandContribution).to(CustomPreferenceInputCommandContribution);
    bind(MenuContribution).to(CustomPreferenceInputMenuContribution);

    
    bindCustomPreferences(bind);
    /*
        # About
            See thread here: https://community.theia-ide.org/t/extending-preference-input-examples/1704
            I'm trying to add new preference input fields
            e.g. to convert the user entered text to uppercase, strip out invalid chars, or edit the preference via a dialog.

        ## my-preferences.ts
            - defines a couple of test preferences (they're working in settings at the top under Aaa)
            - one of them has property 'customInput': 'toUpperCase' being ignored for now
              but it's intended for use with SinglePreferenceWrapper to use PreferenceStringToUpperInput 

        ## preference-string-toupper-input.tsx
            - a custom preference input to uppercase the value entered
            - it's just a renamed version of theia 'preference-string-input.tsx' with toUpperCase() added

        ## my-single-preference-wrapper.tsx
            - overrides 'getInputType' from SinglePreferenceWrapper
            - the intention is if a preference has property 'customInput': 'toUpperCase' set
            - to use the PreferenceStringToUpperInput instead of the standard PreferenceStringInput

        # Problem
            - I haven't been able to hook up the custom input preference-string-toupper-input.tsx
            - SinglePreferenceWrapper which is responsible for determining which input to use for the preference is bound here:
                https://github.com/eclipse-theia/theia/blob/master/packages/preferences/src/browser/views/preference-widget-bindings.ts
              as part of the function that binds the PreferencesWidget
            - I've tried unsuccessfully to 'rebind' SinglePreferenceWrapper in this frontend module
              and wondering if I can get it to rebind will I have another issue
              related to SinglePreferenceDisplayFactory which uses SinglePreferenceWrapper
                https://github.com/eclipse-theia/theia/blob/master/packages/preferences/src/browser/views/components/single-preference-display-factory.tsx
    */

});