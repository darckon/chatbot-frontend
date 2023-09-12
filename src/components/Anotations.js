import { Html } from "@react-three/drei";

export default function Annotation({ children, ...props }) {
    return (
      <Html
        {...props}
        transform>
        <div className="annotation">{children}</div>
      </Html>
    )
  }