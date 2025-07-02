
import Chat from '../assets/Chat.jpg'
export const LandingPage = () => (
 <div className="container mx-auto w-full bg-white">
    <nav className="  shadow flex items-center justify-between py-4 px-6  rounded-b-lg">
      <div className="text-xl font-bold">
        My<span>Chat</span>
      </div>
      <ul className="hidden md:flex space-x-6 font-medium">
        <li className="hover:text-gray-600 hover:underline cursor-pointer">Home</li>
        <li className="hover:text-gray-600 hover:underline cursor-pointer">Features</li>
        <li className="hover:text-gray-600 hover:underline cursor-pointer">Pricing</li>
        <li className="hover:text-gray-600 hover:underline cursor-pointer">Help</li>
      </ul>
      <div className="hidden md:flex space-x-4">
        <a className='font-semibold px-4 py-1 rounded hover:shadow-2xl transition' href="/signup"> Signup</a>
        <a className='font-semibold px-4 py-1 rounded hover:shadow-2xl transition' href="/signin"> Signin</a>
      </div>
    </nav>
    <div className='flex mt-10'>
     <div className='text-center max-w-3xl mx-auto '>  
              <div className='bg-gray-100 rounded-full px-5 py-2.5 inline-flex items-center gap-2 shadow-sm hover:shadow transition-shadow duration-300 cursor-pointer group'>
          <span className='text-sm font-medium group-hover:text-black transition-colors'>
            MyChat v1.0 is now available!
          </span>
        </div>
      <p className='text-gray-600 mb-10 text-lg max-w-2xl mx-auto leading-relaxed mt-20'>A secure, lightning-fast chat platform for businesses, remote teams, communities, and friends. Stay connected with crystal-clear communication.</p>
      <a  href="/signup" data-discover="true">
        <button className='inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive has-[>svg]:px-3 rounded-full bg-black text-white hover:bg-gray-800 px-8 py-7 h-auto text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group'><strong>Try MyChat</strong></button>
      </a>
     </div>
     <img className='rounded-4xl w-1/2' src={Chat} alt=""/>
    </div>
  </div>


);



