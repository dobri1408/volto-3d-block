import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: '3DObjectBlock.title',
    defaultMessage: '3D Object Block',
  },
  fileField: {
    id: '3DObjectBlock.fileField',
    defaultMessage: 'STL File',
  },
  description: {
    id: '3DObjectBlock.description',
    defaultMessage: 'Upload an STL file to render a 3D object.',
  },
});

const ThreeDBlockSchema = (intl) => ({
  title: intl.formatMessage(messages.title),
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['file'],
    },
  ],
  properties: {
    file: {
      title: intl.formatMessage(messages.fileField),
      description: intl.formatMessage(messages.description),
      widget: 'file', // Widget for file upload
    },
  },
  required: ['file'],
});

export default ThreeDBlockSchema;
