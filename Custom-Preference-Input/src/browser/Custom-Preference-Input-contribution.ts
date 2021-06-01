import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const CustomPreferenceInputCommand = {
    id: 'CustomPreferenceInput.command',
    label: "Say Hello"
};

@injectable()
export class CustomPreferenceInputCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(CustomPreferenceInputCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class CustomPreferenceInputMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: CustomPreferenceInputCommand.id,
            label: CustomPreferenceInputCommand.label
        });
    }
}
