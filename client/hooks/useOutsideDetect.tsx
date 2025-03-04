"use client";
import React, { useEffect } from "react";

interface DetectOutsideProps {
  ref: any;
  callback: () => void;
}

function useOutsideDetect({ ref, callback }: DetectOutsideProps) {
  useEffect(() => {
    //handler to detect clicks outside the ref
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // add event listener
    document.addEventListener("mousedown", handleClickOutside);

    //cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}

export default useOutsideDetect;
