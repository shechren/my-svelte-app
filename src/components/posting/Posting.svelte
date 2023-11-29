<script>
  import {  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Form, Input, Button } from 'sveltestrap'
  import 'bootstrap/dist/css/bootstrap.min.css'
  
  let title = ''
  let description = ''
  let category = ''

  const titleStyle = "width: 500px"
  const descStyle = "resize: none; width: 500px;"

  const nameList = ["javascript", "python", "dart"]

  async function submit () {
    const data = {
          title,
          description,
          category
        }
        await fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
</script>
<div class="posting-form">
  <Form>
    <div class="inner-form">
      <div class="title-form">
        <Input placeholder="제목" style={titleStyle} id="title" bind:value={title}/>
      </div>
        <div class="category-form">
          <Dropdown bind:value={category}>
            <DropdownToggle caret>카테고리</DropdownToggle>
            <DropdownMenu>
              {#each nameList as name}
                <DropdownItem on:click={() => category = name}>{name}</DropdownItem>
              {/each}
            </DropdownMenu>
          </Dropdown>
        </div>
      <div class="desc-form">
        <Input type="textarea" placeholder="내용" style={descStyle} rows=10 id="desc" bind:value={description}/>
      </div>
      <div class="submit-button">
        <Button color="success" size="sm" id="submit" on:click={submit}> 저장 </Button>
      </div>
    </div>
  </Form>
</div>
<style>
  .posting-form {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .submit-button {
    align-self: flex-end;
    padding: 10px 10px 10px 0px;
  }

  .category-form {
    padding: 10px 0px 10px 0px;
  }
  
  .inner-form {
    padding: 10px;
    border: 1px solid #C5CAE9;
    border-radius: 2%;
    width: 530px;
    display: flex;
    flex-direction: column;
  }
</style>