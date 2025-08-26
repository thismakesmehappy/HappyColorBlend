import {PLUGIN, UI} from "@common/networkSides";
import {PLUGIN_CHANNEL} from "@plugin/plugin.network";
import {Networker} from "monorepo-networker";
import {WINDOW_HEIGHT, WINDOW_WIDTH} from "../constants/uiConstants";

async function bootstrap() {
    Networker.initialize(PLUGIN, PLUGIN_CHANNEL);

    if (figma.editorType === "figma") {
        figma.showUI(__html__, {
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            title: "Color Scales by This Makes Me Happy",
        });
    } else if (figma.editorType === "figjam") {
        figma.showUI(__html__, {
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            title: "Color Blender by This Makes Me Happy / Bernardo Margulis",
        });
    }

    console.log("Bootstrapped @", Networker.getCurrentSide().name);

    PLUGIN_CHANNEL.emit(UI, "hello", ["Hey there, UI!"]);

    setInterval(() => PLUGIN_CHANNEL.emit(UI, "ping", []), 5000);
}

bootstrap();
