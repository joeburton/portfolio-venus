"use client";

export const RememberingToCode = () => {
  const family = ["Joe", "Anna", "Ella", "Liam", "Sophia"];

  const displayDetails = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    const name = event.currentTarget.textContent;
    alert(`You clicked on ${name}`);
  };

  return (
    <>
      <h1>Remembering ToCode Component</h1>
      <ul>
        {family.map((member) => (
          <li key={member} onClick={displayDetails}>
            {member}
          </li>
        ))}
      </ul>
    </>
  );
};
