const Hero = () => {
  return (
    <>
      <div className="aspect-video bg-[url('/hero.png')] bg-center bg-cover">
        <div className="flex h-screen justify-center">
          <div className="self-end text-center">
            <h1 className="text-8xl font-semibold leading-[0.70] tracking-tighter text-white">
              TikTok
            </h1>
            <button className="mb-[109px] mt-[129px] text-white opacity-60">
              scroll down
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
