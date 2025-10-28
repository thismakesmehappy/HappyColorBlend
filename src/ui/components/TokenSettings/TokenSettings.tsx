import Explain from "@ui/components/helpers/Explain";
import Group from "@ui/components/helpers/Group";
import Case from "@ui/components/TokenSettings/Case";
import Spaces from "@ui/components/TokenSettings/Spaces";
import Leading from "@ui/components/TokenSettings/Leading";
import Separator from "@ui/components/TokenSettings/Separator";
import React from "react";
import Toggle from "@ui/components/helpers/Toggle";
import Help from "@ui/components/helpers/Help";
import {getTooltipProps} from "@ui/constants/tooltips";
import useTokenNameStore from "@ui/store/useTokenNameStore";

const TokenSettings = () => {
    return (
        <div>
            <Explain>
                Configure how the color names will be converted to token names.
            </Explain>
            <Group>
                <Case />
            </Group>
            <Group>
                <Spaces />
            </Group>
            <Group>
                <Leading />
            </Group>
            <Group>
                <Separator />
            </Group>
        </div>
    );
};

export default TokenSettings
