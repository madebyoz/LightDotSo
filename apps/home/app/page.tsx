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

import { LightHorizontalLogo } from "@lightdotso/svg";
import { Button } from "@lightdotso/ui";
import { Spiral } from "@/components/spiral";

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page() {
  return (
    <div>
      <div className=""><LightHorizontalLogo className="size-24" /></div>

      <div className="relative z-10 flex h-[50%] flex-col items-center justify-center">
        <div className="p-4 max-w-5xl">

          <h1 className="text-4xl font-extrabold lg:text-6xl">
            EVM chain abstraction
            <br />
            protocol unifying all
            <br />
            chains as one.
          </h1>
          <div className="py-8">
            <Button size="lg">Explore Now</Button>
            <Button size="lg" variant="outline" className="ml-4">
              Learn More
            </Button>
          </div>
        </div>
      </div>


      <section className="container grid lg:grid-cols-2 place-items-center my-20 py-20 md:py-32 gap-10 h-[800px] bg-background-stronger rounded-lg">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                Shadcn
              </span>{" "}
              landing page
            </h1>{" "}
            for{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                React
              </span>{" "}
              developers
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Build your React landing page effortlessly with the required sections
            to your project.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">


            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa/shadcn-landing-page.git"
              target="_blank"

            >
              Github Repository

            </a>
          </div>
        </div>


        <div className="z-10">

        </div>

      </section>




      <div className="relative z-10 flex h-screen flex-col items-center justify-center bg-background-inverse-strong">
        <div className="m-auto max-w-2xl text-2xl font-light text-text-inverse-weakest">
          <hr className="mb-6" />
          <span className="block mb-6">Introduction</span>
          <h2 className="text-6xl mb-8">Use Ethereum as one.</h2>

          <div className="">
            <p className="mb-6">Light enables using Ethereum, and EVM chains as seamless as possible. Designed from the ground up for the rollup/multi-chain world that we live in, Light enables you to use Ethereum like it is one.
            </p>
            <p className="mb-6">Say goodbye to mundane bridging, gas deposits and refueling gas, or having multiple smart contract wallets for each chain. With Light, users are able to use a single smart account across chains allowing for maximum composability and usability.
            </p>
            <p className="mb-6">
              Light aims to help realize the vision of Ethereum making abstracting the complexities of fragmentation while aligning w/ the core ethos as an 100% open source project.
            </p>
          </div>
        </div>
      </div>



      <div className="container">
        <div className="relative flex h-screen">

          <section
            id="features"
            className="container py-24 sm:py-32 space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
              Many{" "}
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Great Features
              </span>
            </h2>

            <div className="flex flex-wrap md:justify-center gap-4">

              <div>

              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            </div>
          </section>


        </div>
      </div>




      <div className="relative z-10 flex h-screen flex-col items-center justify-center bg-background-inverse-strong">
        <div className="m-auto max-w-2xl text-2xl font-light text-text-inverse-weakest">
          <hr className="mb-6" />
          <span className="block mb-6">Introduction</span>
          <h2 className="text-6xl mb-8">Use Ethereum as one.</h2>

          <div className="">
            <p className="mb-6">Light enables using Ethereum, and EVM chains as seamless as possible. Designed from the ground up for the rollup/multi-chain world that we live in, Light enables you to use Ethereum like it is one.
            </p>
            <p className="mb-6">Say goodbye to mundane bridging, gas deposits and refueling gas, or having multiple smart contract wallets for each chain. With Light, users are able to use a single smart account across chains allowing for maximum composability and usability.
            </p>
            <p className="mb-6">
              Light aims to help realize the vision of Ethereum making abstracting the complexities of fragmentation while aligning w/ the core ethos as an 100% open source project.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-screen flex-col items-center justify-center bg-background-inverse-strong">
        <div className="m-auto max-w-2xl text-2xl font-light text-text-inverse-weakest">
          <hr className="mb-6" />
          <span className="block mb-6">Introduction</span>
          <h2 className="text-6xl mb-8">Use Ethereum as one.</h2>

          <div className="">
            <p className="mb-6">Light enables using Ethereum, and EVM chains as seamless as possible. Designed from the ground up for the rollup/multi-chain world that we live in, Light enables you to use Ethereum like it is one.
            </p>
            <p className="mb-6">Say goodbye to mundane bridging, gas deposits and refueling gas, or having multiple smart contract wallets for each chain. With Light, users are able to use a single smart account across chains allowing for maximum composability and usability.
            </p>
            <p className="mb-6">
              Light aims to help realize the vision of Ethereum making abstracting the complexities of fragmentation while aligning w/ the core ethos as an 100% open source project.
            </p>
          </div>
        </div>
      </div>


    </div>
  );
}
