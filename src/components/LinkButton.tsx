import Link from "next/link";

const LinkButton = () => {
  return (
    <Link
      href={"#"}
      className="font-jetbrains text-sm transition-all text-accent underline hover:no-underline"
    >
      LinkButton
    </Link>
  );
};

export default LinkButton;
