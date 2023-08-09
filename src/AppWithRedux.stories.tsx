
import { action } from '@storybook/addon-actions';


import React from "react";

import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./State/store";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default  {
    title:'AppWithRedux Component',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator],
    // parameters: {
    //     storybookSource: {
    //         // опциональные параметры для настройки внешнего вида панели исходного кода
    //         // see: https://github.com/storybookjs/storybook/tree/next/addons/storysource#options
    //         // (необязательно, но полезно для настройки внешнего вида)
    //         rule: {
    //             // Вы можете применить правила для исходного кода компоненты
    //             // see: https://github.com/storybookjs/storybook/tree/next/addons/storysource#options
    //         },
    //     },
    // },
}





export const AppWithReduxBaseExample = ()=>{
    return<AppWithRedux />
}