// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react";
import { forwardRef } from "react";

export const GnosisLogo: ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
> = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="22" height="22" rx="6" fill="#008B73" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.7457 7.35466C13.4183 4.21605 8.57414 4.22162 6.26343 7.33236C7.85587 8.92118 9.43718 10.51 11.0129 12.0932L15.7457 7.35466ZM12.8518 9.15668C12.2365 9.76853 11.6219 10.3797 11.0074 10.9894L7.33248 7.31006C9.18105 5.32543 12.6833 5.22509 14.6878 7.33236C14.0755 7.93991 13.4645 8.54745 12.8542 9.15431L12.8526 9.15597L12.8518 9.15668ZM6.33737 8.38461L6.33736 8.3846L6.33722 8.38446C6.17859 8.22702 6.02064 8.07025 5.86269 7.91211C4.5208 10.0305 4.62102 13.381 7.0431 15.5217C9.36495 17.5788 13.0008 17.4729 15.1891 15.3043C17.4719 13.0465 17.3661 9.80197 16.1412 7.92883C15.8294 8.2466 15.512 8.56436 15.1946 8.88213C15.9519 9.85772 15.7793 11.0675 15.0499 11.8145C14.3539 12.528 13.1233 12.7956 12.0432 11.965C11.6924 12.3106 11.3416 12.6618 10.9797 13.0298C10.8043 12.8514 10.6289 12.6758 10.4542 12.5009L10.4542 12.5009L10.4541 12.5008L10.4541 12.5007C10.2794 12.3259 10.1054 12.1517 9.93288 11.9761C8.95849 12.7343 7.80034 12.5671 7.07094 11.926C6.70902 11.6082 6.46403 11.2068 6.36937 10.733C6.2246 10.0417 6.39164 9.41731 6.82038 8.8654C6.65821 8.70303 6.49744 8.54347 6.33737 8.38461ZM14.7159 9.34473C15.1892 9.94681 15.1224 10.8499 14.56 11.4018C14.0032 11.9426 13.1068 11.9928 12.5388 11.5245C13.0215 11.0375 13.5066 10.553 13.9909 10.0694L13.9911 10.0691L13.9915 10.0688C14.2333 9.82732 14.4749 9.58602 14.7159 9.34473ZM7.42128 11.3798C7.97251 11.9317 8.87452 11.993 9.45359 11.5248C8.72419 10.7945 8.00035 10.0697 7.27651 9.35059C6.8088 9.92479 6.87005 10.8223 7.42128 11.3798Z"
      fill="white"
    />
  </svg>
));

GnosisLogo.displayName = "GnosisLogo";
