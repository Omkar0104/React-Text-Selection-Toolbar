import React, { useState, useEffect } from "react";
// import './TextSelection.css';

const TextSelection = () => {
  const [selectedText, setSelectedText] = useState("");
  const [toolbarStyle, setToolbarStyle] = useState({ display: "none" });

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      setSelectedText(selectedText);

      if (selectedText) {
        const range = selection.getRangeAt(0).getBoundingClientRect();
        const toolbarTop = range.top - 40;
        const toolbarLeft = range.left + range.width / 2;

        setToolbarStyle({
          display: "block",
          position: "absolute",
          top: `${toolbarTop}px`,
          left: `${toolbarLeft}px`,
        });

        const buttons = document.querySelectorAll(
          ".text-selection-toolbar button"
        );
        buttons.forEach((button) => {
          const format = button.getAttribute("data-format");
          const active = selection.anchorNode.parentNode.tagName === format;
          if (active) {
            button.classList.add("active");
          } else {
            button.classList.remove("active");
          }
        });
      } else {
        setToolbarStyle({ display: "none" });
      }
    };

    document.addEventListener("mouseup", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, []);

  const handleFormat = (format) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const formattedNode = document.createElement(format);
    formattedNode.appendChild(range.extractContents());
    range.insertNode(formattedNode);

    const active = formattedNode.classList.contains("active");
    if (active) {
      formattedNode.outerHTML = formattedNode.innerHTML;
    } else {
      formattedNode.classList.add("active");
    }

    const buttons = document.querySelectorAll(".text-selection-toolbar button");
    buttons.forEach((button) => {
      const buttonFormat = button.getAttribute("data-format");
      if (buttonFormat === format) {
        const active = formattedNode.classList.contains("active");
        if (active) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      }
    });
  };
  return (
    <>
      <div className="text-selection-toolbar" style={toolbarStyle}>
        <button data-format="bold" onClick={() => handleFormat("b")}>
          B
        </button>
        <button data-format="italic" onClick={() => handleFormat("i")}>
          I
        </button>
        <button data-format="underline" onClick={() => handleFormat("u")}>
          U
        </button>
      </div>
      <div className="content" id="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
          Vestibulum lacinia arcu eget nulla. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Reprehenderit voluptates magni corporis,
          autem assumenda amet repellendus perferendis consequuntur natus a,
          inventore dolores incidunt praesentium repellat doloribus quidem velit
          aliquid blanditiis veniam fugiat. Nostrum, enim molestiae laborum quae
          modi ullam doloremque, corporis ipsa ex nisi odit, consectetur
          consequatur aut non harum corrupti cum! Quisquam debitis minus
          laboriosam corrupti error, excepturi a, nostrum recusandae quod ipsa
          amet tempora blanditiis, doloremque minima dolor obcaecati corporis
          itaque perferendis maiores id facere quasi at cupiditate aspernatur?
          Eveniet maxime qui rem repellat in maiores, quasi eaque.
          Necessitatibus possimus corrupti labore, numquam aliquam sint ipsam
          eum rem ut eaque suscipit temporibus? Aliquam natus, a hic quas
          suscipit odio accusamus aliquid in sapiente eos tempora voluptatibus
          reiciendis. Voluptate sit architecto doloremque sint numquam qui rerum
          veritatis dicta quis aliquid ipsam, unde laborum? Dicta consequatur
          iste quas ipsum labore at excepturi earum cupiditate error, velit,
          deleniti fugiat. Fugiat quam veritatis quaerat recusandae vitae
          temporibus sapiente reiciendis delectus ullam voluptas perferendis
          itaque quo exercitationem tempore alias, doloremque, sunt distinctio
          aperiam incidunt, provident cum dolore? Amet laudantium quisquam animi
          quasi nam expedita aperiam ullam magni quos necessitatibus ex fuga
          reiciendis, natus ratione praesentium iusto totam cum dolorem! Magnam,
          omnis. Qui, laudantium.
        </p>
      </div>
    </>
  );
};

export default TextSelection;
