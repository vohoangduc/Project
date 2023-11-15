<template>
  <Teleport to="body">
    <div class="absolute inset-0 bg-slate-800">
      <div class="flex justify-center items-center w-screen h-screen">
        <div class="space-y-2 text-center">
          <img
            src="/logo.png"
            class="w-24 object-contain aspect-[3/4] animate-pulse"
          />
          <div class="text-white font-medium text-sm tracking-wider">
            Loading...
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
