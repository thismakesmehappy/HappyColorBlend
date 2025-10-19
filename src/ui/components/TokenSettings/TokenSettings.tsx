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
    const keepCSSClean = useTokenNameStore(state => state.keepCSSClean);
    const toggleKeepCSSClean = useTokenNameStore(state => state.toggleKeepCSSClean);
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
            <Explain>
                Making CSS and SCSS variables conmpliant removes trailing characters. CSS ariables are always prepended with two dashes.
            </Explain>
            <Group>
                <div className="figma-mr-sm d-flex"><Toggle
                    value={keepCSSClean}
                    onChange={toggleKeepCSSClean}
                    className={"d-inline-block figma-mr-sm"}
                    size={2}
                />
                    <div
                        className={"d-inline-block"}>Make CSS and SCSS variable names compliant
                    </div>
                </div>
            </Group>
        </div>
    );
};

export default TokenSettings
