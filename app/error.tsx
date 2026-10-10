"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-16 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="text-xl font-bold">তথ্য লোড করা যায়নি</h1>
      <p className="text-base-content/70">সার্ভারের সাথে সংযোগ হচ্ছে না। একটু পরে আবার চেষ্টা করুন।</p>
      <button onClick={reset} className="btn btn-primary">আবার চেষ্টা করুন</button>
    </div>
  );
}
