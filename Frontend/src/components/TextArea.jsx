const Textarea = ({ className, ...props }) => (
    <textarea className={`p-2 border rounded-md ${className}`} {...props} />
  );
export default Textarea;  