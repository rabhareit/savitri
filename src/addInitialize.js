document.getElementById('initBtn').addEventListener('click', async () => {
  await initializeTable();  
})

document.getElementById('histBtn').addEventListener('click', async () => {
  await initializeClue();
})