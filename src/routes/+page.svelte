<script>
  import '$resources/app.css'
  import { enhance } from '$app/forms'
  import { goto } from '$app/navigation';
  import { page } from '$app/stores' 

  export let form;
  
  let message = ''

  const signIn = ({ form }) => {
  return async ({ result, update }) => {
    let code = '';

    if (result.data && result.data.role === 'owner') {
      code = result.data.code;
    } else if (result.data && result.data.type === 'success') {
      code = result.data.code;
    } else if (result.data && result.data.type === 'invalid') {
      message = '잘못된 정보입니다.';
      return;
    }

    await goto(`/Home/${code.toString()}`, { replaceState: true });
  }
}
</script>
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6"  method="POST" action='?/login' use:enhance={signIn}>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">이메일</label>
        <div class="mt-2">
          <input id="email" name="email" value={form?.email ?? ""} type="email" autocomplete="email"class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">비밀번호</label>
        </div>
        <div class="mt-2">
          <input id="password" name="password" value={form?.password ?? ""} type="password" autocomplete="current-password" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>
      <div class="signButtons">
        <div class="signInButton">
          <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">로그인</button>
        </div>
        <div class="signUpButton">
          <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><a href="/SignUp">회원가입</a></button>
        </div>
      </div>
    </form>
    <div class="message">
      <p> {message} </p>
    </div>
  </div>
</div>
<style>
  .signButtons {
    display: flex;
    justify-content: space-between;
  }
</style>