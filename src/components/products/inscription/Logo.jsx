import { useId } from 'react'

export function Logo(props) {
  const id = useId()

  return (
    <svg
      width="112"
      height="112"
      viewBox="0 0 112 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 10C0 4.47715 4.47715 0 10 0H102C107.523 0 112 4.47715 112 10V102C112 107.523 107.523 112 102 112H79.846C73.4755 112 68.729 106.123 70.0701 99.8949L72.9546 86.4997C73.5709 83.6375 75.5256 81.3364 77.775 79.4621C81.403 76.4392 85 70.9707 85 59.4822C85 50.5834 79.3726 43.7217 73.5707 36.6473C69.1188 31.2191 64.5643 25.6656 62.3704 18.9705C61.387 15.9695 59 16.4698 59 19.9708V53C59 54.6569 57.6569 56 56 56C54.3431 56 53 54.6569 53 53V19.9708C53 16.4698 50.613 15.9695 49.6296 18.9705C47.4357 25.6656 42.8812 31.2191 38.4293 36.6473C32.6274 43.7217 27 50.5834 27 59.4822C27 70.9707 30.597 76.4392 34.225 79.4621C36.4744 81.3364 38.4291 83.6375 39.0454 86.4997L41.9299 99.8949C43.271 106.123 38.5246 112 32.154 112H10C4.47715 112 0 107.523 0 102V10ZM56 67C54.3431 67 53 68.3431 53 70V76C53 77.6569 54.3431 79 56 79C57.6569 79 59 77.6569 59 76V70C59 68.3431 57.6569 67 56 67Z"
        fill={`url(#${id}-gradient)`}
        />
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1="56"
          y1="0"
          x2="56"
          y2="112"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F0ABFC" />
          <stop offset="1" stopColor="#E546E9" />
        </linearGradient>
      </defs>
    </svg>
  )
}
