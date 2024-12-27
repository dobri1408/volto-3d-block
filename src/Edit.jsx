import AttachedFileWidget from '@eeacms/volto-object-widget/Widget/AttachedFileWidget';
import loadable from '@loadable/component';
import { SidebarPortal } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';

import { BlockDataForm } from '@plone/volto/components';
import schema from './schema';

const ThreeDViewer = loadable(() => import('./View'));

const messages = defineMessages({
  '3d': {
    id: '3d',
    defaultMessage: '3D Block',
  },
});

const ThreeDBlockEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  const intl = useIntl();
  const handleFileChange = (file) => {
    onChangeBlock(block, {
      ...data,
      file: file, // File UID or path
    });
  };

  return (
    <div className="three-d-block-edit">
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema(intl)}
          title={intl.formatMessage(messages['3d'])}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
        />
      </SidebarPortal>
      {data?.file ? (
        <div className="three-d-preview">
          <ThreeDViewer data={{ file: data.file }} />
          <button
            type="button"
            onClick={() => handleFileChange(null)}
            className="remove-file-button"
          >
            Remove File
          </button>
        </div>
      ) : (
        <>
          <p>Please select a 3d file</p>
        </>
      )}
    </div>
  );
};

export default ThreeDBlockEdit;
