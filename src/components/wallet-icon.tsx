type IconProps = React.HTMLAttributes<SVGElement>;

export type WalletIconType = keyof typeof WalletIcon;

export const WalletIcon = {
  talismanWallet: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <g clipPath="url(#clip0_460_7450)">
        <mask
          id="mask0_460_7450"
          style={{ maskType: "luminance" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <path d="M48 0H0V48H48V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_460_7450)">
          <path
            d="M24 46.8C36.5921 46.8 46.8 36.592 46.8 24C46.8 11.4079 36.5921 1.19995 24 1.19995C11.4079 1.19995 1.2 11.4079 1.2 24C1.2 36.592 11.4079 46.8 24 46.8Z"
            fill="#D5FF5C"
            stroke="black"
            strokeWidth="1.5"
          />
          <mask
            id="mask1_460_7450"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="8"
            y="8"
            width="32"
            height="32"
          >
            <path d="M40 8H8V40H40V8Z" fill="white" />
          </mask>
          <g mask="url(#mask1_460_7450)">
            <path
              d="M21.0322 31C21.0322 32.645 22.3584 33.98 24 34C25.6416 33.98 26.9678 32.645 26.9678 31C26.9678 29.355 25.6416 28.02 24 28C22.3584 28.02 21.0322 29.355 21.0322 31Z"
              fill="#FD4848"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.9317 25.8301C14.6264 26.4899 13.7306 26.725 13.2151 26.2099L12.2692 25.265C11.2933 24.2899 9.70682 24.2899 8.73091 25.265C7.75499 26.24 7.75499 27.825 8.73091 28.8L16.3731 36.435C18.2048 38.605 20.9374 39.985 23.9952 39.995C27.0531 39.985 29.7907 38.605 31.6174 36.435L39.2595 28.8C40.2355 27.825 40.2355 26.24 39.2595 25.265C38.2837 24.2899 36.6971 24.2899 35.7213 25.265L34.7753 26.2099C34.2598 26.725 33.364 26.4899 33.0587 25.8301C32.9987 25.7 32.9637 25.56 32.9637 25.415V14C32.9637 12.62 31.8425 11.5 30.4613 11.5C29.08 11.5 27.9589 12.62 27.9589 14V19.78C27.9589 20.275 27.4485 20.615 26.9729 20.465C26.6728 20.3701 26.4576 20.095 26.4576 19.785V10.5C26.4576 9.13 25.3565 8.02 23.9902 8C22.624 8.02 21.5229 9.13 21.5229 10.5V19.78C21.5229 20.095 21.3077 20.365 21.0073 20.46C20.532 20.6099 20.0214 20.2699 20.0214 19.775V13.995C20.0214 12.615 18.9005 11.495 17.5192 11.495C16.1379 11.495 15.0168 12.615 15.0168 13.995V25.4101C15.0168 25.555 14.9818 25.695 14.9217 25.825L14.9317 25.8301ZM24.0001 26C19.5961 26.025 16.0278 31 16.0278 31C16.0278 31 19.5961 35.975 24.0001 36C28.4043 35.975 31.9726 31 31.9726 31C31.9726 31 28.4043 26.025 24.0001 26Z"
              fill="#FD4848"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_460_7450">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  subWallet: (props: IconProps) => (
    <svg
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <circle
        cx="21"
        cy="21"
        r="20.5"
        fill="url(#pattern0_755_9648)"
        stroke="white"
      />
      <defs>
        <pattern
          id="pattern0_755_9648"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_755_9648" transform="scale(0.0357143)" />
        </pattern>
        <image
          id="image0_755_9648"
          width="28"
          height="28"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAClklEQVRIDbWWT2gTQRTGp6KlgnoRL6IIERFBL72IIohKsBDoSRD/oCD01Is30ZsgKIL/LsGTB1Ehh2ILQSQoEaFaqRYqlZI2RVs9VFGigZKC2Ce/ta/sjm+WUJqBj5l5+973vW9mWdY5b3ScnM90nGnk27oXqm3dC7JMVOGAy6NPbttPNQqrj/2WlQScSZXF3bqe+mT7iXlpBeBOiNJFx9k5CUGbCD1vJr7klHNe21MXCxAhdqW/Judu/lsTs3KbiUV3yuWu762JDwiOX69LfPxq/JHbpR8JQb8ubY+W43w3nP8uPijEWWi8+Tgnp+/8jMTJ9eutfXSXmy7OigUK0gS1EXUdF7D4NOZ04c/u0nRTgirMjOuj+S+mgc2XP0dxx8KCL6hO4gLWmlOh1uIk5rZc/SQWVl2bSDicrjUiIm0EN9bgpaLW4iTmtt6YEgu+IA45LuKK7fmK9Fe+LenSFDkWn8YcRRZIoFt/QKouVJg5+6gSNUKdxaexoODGu2NyoTzl6yX2uFMh8pU0bXY7741JCJBAGD+2hOLiRl2TD0J8xN2uB6OSBpLW3H8bAceQpw1ytj0cCXK63YURCYFCAAmirJnVNS+SP259qER5IU635/GwhODfoQrnSu+Cx4xgiI+46ywOiQUeUhwf3GUzR0qtxUnMdZYGJQRfMC7ur/kQ4DzEpXG398VLsUBCM4K4pp58i8ePuf2vytV9g2WxEBLkZeHZjqGnEaxaK4aWOzxRzB8Yfi4WesdfJ06O+1MhCK2atBha7sj7Z5mDoyUJAReIIM46lNdMHK3oZypbLRYOjT+RVgKNxJ9b18zAZLZalFYA7oSYbuiia2ZAVhL/OVMxnXNf+zJcLl3lZvtkOaAWDriUV+e/XkVIvrfPtp0AAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  ),
  account: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      {...props}
    >
      <circle cx="24" cy="24" r="23.5" stroke="#4E4E4E" />
    </svg>
  ),
};
