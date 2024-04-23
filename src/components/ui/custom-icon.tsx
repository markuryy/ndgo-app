import cn from 'clsx';

type IconName = keyof typeof Icons;

type IconProps = {
  className?: string;
};

type CustomIconProps = IconProps & {
  iconName: IconName;
};

const Icons = {
  PinIcon,
  AppleIcon,
  PinOffIcon,
  GoogleIcon,
  TwitterIcon,
  FeatherIcon,
  SpinnerIcon,
  TriangleIcon
};

export function CustomIcon({
  iconName,
  className
}: CustomIconProps): JSX.Element {
  const Icon = Icons[iconName];

  return <Icon className={className ?? 'h-6 w-6'} />;
}

function TwitterIcon({ className }: IconProps): JSX.Element {
  return (
    <svg className={cn('fill-current', className)} viewBox='0 0 18 18'>
      <g>
      <path d="M4.068 1.373c-.437.077-.612.14-1.017.347-.702.36-1.323 1.035-1.697 1.845-.319.692-.508 1.511-.589 2.555-.036.441-.045 2.205-.036 5.409.014 4.752.014 4.757.108 4.883s.099.126.644.14c.378.009.576-.005.653-.045.059-.032 3.231-3.173 7.052-6.98 3.815-3.803 6.956-6.917 6.978-6.917.018 0 .041 1.697.05 3.767.014 5.207.009 5.553-.104 6.201-.113.671-.176.9-.225.851-.023-.023-.122-.252-.225-.513-.558-1.413-1.431-2.916-2.592-4.455-.477-.639-.621-.765-.869-.765-.189 0-.441.23-.482.432-.032.18-.023.198.446.792 1.211 1.553 2.376 3.713 2.939 5.454l.131.396-.194.167c-1.328 1.143-3.267.896-5.229-.671-.392-.315-1.467-1.382-1.679-1.67-.153-.207-.387-.333-.54-.293-.306.077-.513.428-.387.662.086.167 1.044 1.22 1.454 1.598.761.707 1.638 1.305 2.412 1.643a4.9 4.9 0 0 0 1.868.432c.788.032 1.301-.072 1.935-.387 1.175-.59 1.85-1.598 2.219-3.312l.117-.54.014-5.369.018-5.364-.113-.113c-.108-.108-.14-.113-.621-.113-.333.005-.545.023-.617.063-.054.032-3.245 3.186-7.079 7.007-3.838 3.82-6.997 6.957-7.015 6.961-.023.009-.041-2.03-.041-4.622 0-3.924.009-4.716.068-5.166.081-.612.194-1.139.243-1.139.018 0 .113.207.203.459.459 1.256 1.413 2.943 2.489 4.392.671.905.86 1.049 1.166.9.153-.072.333-.324.333-.464 0-.059-.216-.396-.509-.792-1.422-1.935-2.435-3.825-2.889-5.4-.14-.482-.131-.5.266-.783.549-.392.986-.522 1.737-.522 1.139 0 2.277.495 3.447 1.499.356.302 1.238 1.229 1.548 1.625a.9.9 0 0 0 .234.194c.401.207.873-.297.63-.68-.144-.23-1.053-1.242-1.449-1.611C7.58 1.772 5.744 1.066 4.07 1.372"/>
      </g>
    </svg>
  );
}

function FeatherIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={cn('fill-current', className)}
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <g>
      <path d="M4 9V6H1V4h3V1h2v3h3v2H6v3zm6.4 13.6c-3.2 0-3.6-4.2-3.8-7 0-.6-.4-1-.7-1h-2c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h2c1.5 0 2.7 1.3 2.9 3 .3 3.6.8 5 1.7 5s1.4-.2 1.4-6.9.4-9.1 3.6-9.1 3.6 4.2 3.8 7c0 .6.4 1 .7 1h2c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1h-2c-1.5 0-2.7-1.3-2.9-3-.3-3.6-.8-5-1.7-5s-1.4.2-1.4 6.9-.4 9.1-3.6 9.1"/>
      </g>
    </svg>
  );
}

function SpinnerIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  );
}

function GoogleIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 48 48'
    >
      <g>
        <path
          fill='#EA4335'
          d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
        />
        <path
          fill='#4285F4'
          d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
        />
        <path
          fill='#FBBC05'
          d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
        />
        <path
          fill='#34A853'
          d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
        />
        <path fill='none' d='M0 0h48v48H0z' />
      </g>
    </svg>
  );
}

function AppleIcon({ className }: IconProps): JSX.Element {
  return (
    <svg className={className} viewBox='0 0 24 24'>
      <g>
        <path d='M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z' />
      </g>
    </svg>
  );
}

function TriangleIcon({ className }: IconProps): JSX.Element {
  return (
    <svg className={className} viewBox='0 0 24 24' aria-hidden='true'>
      <g>
        <path d='M12.538 6.478c-.14-.146-.335-.228-.538-.228s-.396.082-.538.228l-9.252 9.53c-.21.217-.27.538-.152.815.117.277.39.458.69.458h18.5c.302 0 .573-.18.69-.457.118-.277.058-.598-.152-.814l-9.248-9.532z' />
      </g>
    </svg>
  );
}

function PinIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4' />
      <line x1='9' y1='15' x2='4.5' y2='19.5' />
      <line x1='14.5' y1='4' x2='20' y2='9.5' />
    </svg>
  );
}

function PinOffIcon({ className }: IconProps): JSX.Element {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      strokeWidth='2'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <line x1='3' y1='3' x2='21' y2='21' />
      <path d='M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251' />
      <line x1='9' y1='15' x2='4.5' y2='19.5' />
      <line x1='14.5' y1='4' x2='20' y2='9.5' />
    </svg>
  );
}
