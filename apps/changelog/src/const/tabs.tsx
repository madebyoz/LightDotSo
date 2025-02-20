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

"use client";

import type { Tab } from "@lightdotso/types";
import { DashboardIcon, WidthIcon } from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { ArrowUpRightFromSquare } from "lucide-react";
import type { RefAttributes } from "react";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

export const CHANGELOG_TABS: Tab[] = [
  {
    label: "Home",
    id: "changelog",
    href: "/",
    icon: (
      props: JSX.IntrinsicAttributes & IconProps & RefAttributes<SVGSVGElement>,
    ) => <DashboardIcon {...props} />,
  },
  {
    label: "App",
    id: "app",
    href: "https://light.so",
    icon: (
      props: JSX.IntrinsicAttributes & IconProps & RefAttributes<SVGSVGElement>,
    ) => <ArrowUpRightFromSquare {...props} />,
  },
];
