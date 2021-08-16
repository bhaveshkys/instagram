import { useEffect } from "react";

export default function NotFound() {
  useEffect(()=>{
    document.title="not-found instagram"
  })
  return (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">
        <p className="text-center text-2xl"> NOT FOUND</p>
      </div>
    </div>
  );
}
