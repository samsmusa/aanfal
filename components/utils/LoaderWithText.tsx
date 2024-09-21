import React from 'react';
import {LoaderCircle} from 'lucide-react';
import {cn} from "@/lib/utils";

interface LoaderButtonProps {
    loading: boolean;
    text: string;
}

const LoaderWithText: React.FC<LoaderButtonProps> = ({loading, text}) => {
    return (
        <>
      <span
          className={cn(
              'transition ease-in-out duration-700',
              loading ? '-translate-x-5' : 'translate-x-0'
          )}
      >
        {text}
      </span>
            <span
                className={cn(
                    'absolute transition ease-in-out duration-700 delay-75',
                    loading ? 'translate-x-5 opacity-100' : 'translate-x-0 opacity-0'
                )}
            >
        <LoaderCircle className="animate-spin"/>
      </span>
        </>
    );
};

export default LoaderWithText;
