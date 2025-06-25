import {PLUGIN, UI} from "@common/networkSides";
import {PLUGIN_CHANNEL} from "@plugin/plugin.network";
import {Networker} from "monorepo-networker";

async function bootstrap() {
    Networker.initialize(PLUGIN, PLUGIN_CHANNEL);

    if (figma.editorType === "figma") {
        figma.showUI(__html__, {
            width: 1000,
            height: 616,
            title: "Color Blender by This Makes Me Happy / Bernardo Margulis",
        });
    } else if (figma.editorType === "figjam") {
        figma.showUI(__html__, {
            width: 1000,
            height: 616,
            title: "Color Blender by This Makes Me Happy / Bernardo Margulis",
        });
    }

    console.log("Bootstrapped @", Networker.getCurrentSide().name);

    PLUGIN_CHANNEL.emit(UI, "hello", ["Hey there, UI!"]);

    setInterval(() => PLUGIN_CHANNEL.emit(UI, "ping", []), 5000);
}

bootstrap();
