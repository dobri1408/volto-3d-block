import { FileWidget } from '@plone/volto/components';
import loadable from '@loadable/component';

const ThreeDViewer = loadable(() => import('./View'));

const ThreeDBlockEdit = (props) => {
  const { data, onChangeBlock, block } = props;

  const handleFileChange = (file) => {
    onChangeBlock(block, {
      ...data,
      file: file, // File UID or path
    });
  };

  return (
    <div className="three-d-block-edit">
      {data?.file ? (
        <div className="three-d-preview">
          <ThreeDViewer file={data.file} />
          <button
            type="button"
            onClick={() => handleFileChange(null)}
            className="remove-file-button"
          >
            Remove File
          </button>
        </div>
      ) : (
        <FileWidget
          id="stl-file"
          title="Upload STL File"
          value={data?.file || ''}
          onChange={(id, value) => handleFileChange(value)}
        />
      )}
    </div>
  );
};

export default ThreeDBlockEdit;
