import Explain from "@ui/components/helpers/Explain";
import Group from "@ui/components/helpers/Group";
import Case from "@ui/components/TokenSettings/Case";
import Spaces from "@ui/components/TokenSettings/Spaces";
import Leading from "@ui/components/TokenSettings/Leading";
import Separator from "@ui/components/TokenSettings/Separator";
import React from "react";

const TokenSettings = () => {
    return (
        <div>
            <Explain>
                Configure how the color names will be converted to token names.
            </Explain>
            {/*<TokenNamingSample className="figma-mb-lg" />*/}
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
