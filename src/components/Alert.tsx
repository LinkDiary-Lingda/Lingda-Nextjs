import React from 'react';

export default function Alert({
  isOpen,
  title,
  subTitle,
  informativeText,
  secondaryBtn,
  secondaryAction,
  primaryBtn,
  primaryAction,
}: {
  isOpen: boolean;
  title: string;
  subTitle?: string;
  informativeText: string;
  secondaryBtn: string;
  secondaryAction: (param?: any) => any;
  primaryBtn: string;
  primaryAction: (param?: any) => any;
}) {
  return (
    <>
      {isOpen && (
        <section className="absolute flex justify-center items-center top-0 left-0 h-full w-full bg-opacity-50 bg-black z-30">
          <div className="bg-white w-[312px] rounded-xl flex flex-col justify-between">
            <div className="flex flex-col items-center text-Body-1 gap-2 py-9 leading-Body-1">
              <div className="text-center">
                <p>{title}</p>
                {subTitle && <p>{subTitle}</p>}
              </div>
              <p className="font-semibold">{informativeText}</p>
            </div>
            <div className="flex justify-between items-center border-t border-Primary-02 font-semibold text-Body-2">
              <button
                className="h-[44px] flex-1 text-Primary-04"
                onClick={secondaryAction}
              >
                {secondaryBtn}
              </button>
              <button
                className="h-[44px] flex-1 bg-Primary-02 text-white rounded-br-xl"
                onClick={primaryAction}
              >
                {primaryBtn}
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
