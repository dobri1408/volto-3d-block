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

  const handleCameraChange = (cameraData) => {
    console.log('intru');
    onChangeBlock(block, {
      ...data,
      savedCameraPosition: cameraData,
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
          <ThreeDViewer
            data={{
              isEditMode: true,
              savedCameraPosition: data.savedCameraPosition,
              onCameraChange: handleCameraChange,
              file: data.file,
            }}
          />
        </div>
      ) : (
        <>
          <p>Please select a 3D file</p>
        </>
      )}
    </div>
  );
};

export default ThreeDBlockEdit;
