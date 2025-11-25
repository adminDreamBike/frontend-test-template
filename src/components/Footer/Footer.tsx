import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-[100px] bg-[#404040] flex items-center justify-center">
      <Link href='/'>
        <Image src='/assets/logo.webp' alt="logo image" width={150} height={150} />
      </Link>
    </div>
  );
};

export default Footer;
