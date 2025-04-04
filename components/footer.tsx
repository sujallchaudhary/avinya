import {IconBrandInstagram,IconBrandReddit,IconBrandTelegram} from '@tabler/icons-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-black dark:border-white/20 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-gray-600 dark:text-gray-400">
      <div className="flex space-x-4 mb-4 sm:mt-0">
        <Link href="https://www.reddit.com/u/gale-tales/" target='_blank'>
        <IconBrandReddit size={24} className='text-slate-400 dark:text-gray-400'/>
        </Link>
        <Link href="https://www.instagram.com/galetales.live" target='_blank'>
        <IconBrandInstagram size={24} className='text-slate-400 dark:text-gray-400'/>
        </Link>
        <Link href="https://t.me/galetales" target='_blank'>
        <IconBrandTelegram size={24} className='text-slate-400 dark:text-gray-400'/>
        </Link>

        </div>
        <div className="text-center sm:text-left">
          © {new Date().getFullYear()} Gale Tales. All rights reserved.
        </div>
      </div>
    </footer>
  );
}