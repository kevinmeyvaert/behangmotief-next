import ReactMarkdown from 'react-markdown';

const BlockText = ({ contentBlock }) => <ReactMarkdown className="text-block">{contentBlock.text}</ReactMarkdown>;

export default BlockText;
