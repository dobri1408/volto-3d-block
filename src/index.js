import Edit from './Edit';
import View from './View';
import schema from './schema';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import { svgIcon } from './3d';
import { defineMessages, createIntlCache, createIntl } from 'react-intl';
import './style.less';

const messages = defineMessages({
  BlockTitle3D: {
    id: 'Block3D',
    defaultMessage: '3DBlock',
  },
});

const cache = createIntlCache();

const intl = createIntl(
  {
    locale: 'en',
    messages: messages,
  },
  cache,
);
console.log(videoSVG);

const applyConfig = (config) => {
  config.blocks.blocksConfig['3d_block'] = {
    ...config.blocks.blocksConfig['3d_block'],
    id: '3d_block',
    title: '3D File Block',
    icon: svgIcon,
    group: 'media',
    view: View,
    edit: Edit,
    schema: schema(intl),
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,

    security: {
      addPermission: [],
      view: [],
    },
    autoAdd: false,
  };

  return config;
};

export default applyConfig;
