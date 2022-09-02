function get_wp_post_text(h1_to_h3_tags_pause=2, h4_to_h6_tags_pause=1.5, li_tag_pause=1, strong_tag_pause=1)
{

  // get the div with the post's text content
  var a = document.querySelector('#primary')
  var b = a.innerHTML
  // get rid of img tags. If there is an alt attribute for an img tag, copying the text of the article might including the alt tag text. We don't want that.
  // make sure this is NON-GREEDY
  var c = b.replace(/<img[^>]*>/g,"")

  // because I want to remove captions for images, such as for "Image via Pixabay", remove figcaption tags
  c = c.replace(/<figcaption.*\/figcaption>/g,"")

  // replace empty tags, for example <strong></strong>. Don't forget to break the / as well, if I'm using regex in the form of /....../
  var d = c.replace(/<strong><\/strong>/g, "")
  d = d.replace(/<li><\/li>/g, "")
  d = d.replace(/<b><\/b>/g, "")
  d = d.replace(/<h1><\/h1>/g, "")
  d = d.replace(/<h2><\/h2>/g, "")
  d = d.replace(/<h3><\/h3>/g, "")
  d = d.replace(/<h4><\/h4>/g, "")
  d = d.replace(/<h5><\/h5>/g, "")
  d = d.replace(/<h6><\/h6>/g, "")

  // NOTE I PREFER NON-GREEDY. If I have greedy, <h1><b> and I want to stop at >, it might take the <b> too
  // *? - zero or more (non-greedy).
  // let's add 4 new lines as well. Additionally use a variable and template literals so I don't have to re-type \n\n\n\n over and over
  // I WILL FIX THE NUMBER OF NEW LINES LATER.

  // if h1, h2 ,... then strong or b, replace with just the header
  d = d.replace(/<h1.*?><strong>/g, `<h1>`);
  d = d.replace(/<h2.*?><strong>/g, `<h2>`);
  d = d.replace(/<h3.*?><strong>/g, `<h3>`);
  d = d.replace(/<h4.*?><strong>/g, `<h4>`);
  d = d.replace(/<h5.*?><strong>/g, `<h5>`);
  d = d.replace(/<h6.*?><strong>/g, `<h6>`);
  d = d.replace(/<h1.*?><b>/g, `<h1>`);
  d = d.replace(/<h2.*?><b>/g, `<h2>`);
  d = d.replace(/<h3.*?><b>/g, `<h3>`);
  d = d.replace(/<h4.*?><b>/g, `<h4>`);
  d = d.replace(/<h5.*?><b>/g, `<h5>`);
  d = d.replace(/<h6.*?><b>/g, `<h6>`);

  // replace starting headers by 🎃🎃🎃🎃
  d = d.replace(/<h1.*?>/g, `🎃🎃🎃🎃`);
  d = d.replace(/<h2.*?>/g, `🎃🎃🎃🎃`);
  d = d.replace(/<h3.*?>/g, `🎃🎃🎃🎃`);
  d = d.replace(/<h4.*?>/g, `🎃🎃🎃🎃`);
  d = d.replace(/<h5.*?>/g, `🎃🎃🎃🎃`);
  d = d.replace(/<h6.*?>/g, `🎃🎃🎃🎃`);

  // d = d.replace(/<h6 ([^>]*)>/g, "🎃🎃🎃🎃");

  // now do for </h1>, </h2> etc
  // we don't need to use a complex regex here since h1, h2 ... tags will always end like: </h1>, </h2> etc
  // don't forget to "break" "/" with

  // DON'T FORGET g for global flag, otherwise the regex might not get all of them. For example, if there are multiple </h2>, it might just get the first one

  // remember to replace every case, so use g flag

  // use emojis instead of <break time temporarily. Then replace them at the end. For some reason, DOMParser might mess it up if I don't do it the way I just mentioned
  h1_to_h3_tags_replacement = '🌞🌞🌞🌞'
  h4_to_h6_tags_replacement = '🦄🦄🦄🦄'
  li_tag_replacement = '⏱️⏱️⏱️⏱️'
  strong_tag_replacement = '⏰⏰⏰⏰'

  d = d.replace(/<\/h1>/g, h1_to_h3_tags_replacement)
  d = d.replace(/<\/h2>/g, h1_to_h3_tags_replacement)
  d = d.replace(/<\/h3>/g, h1_to_h3_tags_replacement)
  d = d.replace(/<\/h4>/g, h4_to_h6_tags_replacement)
  d = d.replace(/<\/h5>/g, h4_to_h6_tags_replacement)
  d = d.replace(/<\/h6>/g, h4_to_h6_tags_replacement)
  // d

  d = d.replace(/<li>/g, "🎃🎃🎃🎃")
  d = d.replace(/<\/li>/g, li_tag_replacement)

  d = d.replace(/<b>/g, "🎃🎃🎃🎃")
  d = d.replace(/<\/b>/g, strong_tag_replacement)
  d = d.replace(/<strong>/g, "🎃🎃🎃🎃")
  d = d.replace(/<\/strong>/g, strong_tag_replacement)

  // if I don't want to use the Halloween Jack-O-Lanterns, just use the following line. It makes a deep copy of d.
  // var e = structuredClone(d);

  // Copy the message back into HTML. This is so I can re-parse it.
  // convert the string in html format to an object that javascript can undertsand
  // the following function is from // https://codesource.io/how-to-convert-a-string-to-html-in-javascript/
  var ConvertStringToHTML = function (str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

  var e = ConvertStringToHTML(d)

  // just get the text
  var finalText = e.innerText
  // finalText

  // replace Posted in until the end of the total string by nothing
  // REMEMBER THAT s flag is dot all, which means that it will read over all lines
  // m flag I think means each line separately???
  finalText = finalText.replace(/Posted in\w.*$/s, "")

  // finalText

  // eg Posted byWatson Dog Products Writing TeamAugust 5, 2022August 7, 2022
  // replace a line with Posted by\w.* by nothing. And do for"Best Obedience Training for Dogs <break time='2s'/>


  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline


  // The value of multiline is a Boolean and is true if the m flag was used; otherwise, false. The m flag indicates that a 
  // multiline input string should be treated as multiple lines. For example, if m is used, ^ and $ change from matching at only the start or 
  // end of the entire string to the start or end of any line within the string.

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll

  // The value of dotAll is a Boolean and true if the s flag was used; otherwise, false. The s flag indicates that the dot special character (.) 
  // should additionally match the following line terminator ("newline") characters in a string, which it would not match otherwise:

  // This effectively means the dot will match any character on the Unicode Basic Multilingual Plane (BMP). To allow it to match astral characters, 
  // the u (unicode) flag should be used. Using both flags in conjunction allows the dot to match any Unicode character, without exceptions.
  // replace Posted by ... by nothing and treat each line as separate
  // don't forget g flag which will match the top and the bottom. the m flag will treat each line separately
  finalText = finalText.replace(/Posted by.*$/mg, "")
  // finalText

  // replace text at the top of the post which has the text Leave a comment on
  // eg Leave a comment on How To Teach A Dog To Fetch

  // remember that . does not match new line
  finalText = finalText.replace(/Leave a comment on.*/,"")
  // finalText

  // replace Audio Player text
  // Audio Playerhttps://watsondogproducts.com/wp-content/uploads/2022/08/how-teach-dog-fetch.mp300:0000:0000:00Use Up/Down Arrow keys to increase or decrease volume.

  finalText = finalText.replace(/Audio Playerhttp.*decrease volume\./,"")
  // finalText

  // Remove last updated code
  // for example
  // Last updated on August 7th, 2022Have you ever been
  // Note this will only work for dates of format month day, year. You may need to modify it.
  // use i flag if I want to just use [a-z] instead of [a-zA-z]. It's just a shortcut.
  // there needs to be at least 1 digit for the day, so use +.\

  // to make it slightly easier to understand, I'll inject variables in the regex

  var any_letter_regex = "[a-zA-Z]"

  // also use template literals to make it easier
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  // Last updated on August 7th, 2022Have you ever been

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw

  // use raw like in Python so that metacharacters like \d are preserved
  // use String.raw with template literal

  var last_updated_regex = String.raw`Last updated on ${any_letter_regex}+ \d+${any_letter_regex}+, \d\d\d\d`

  var last_updated_regex_final= new RegExp(last_updated_regex)
  finalText = finalText.replace(last_updated_regex_final, "")

  // here use multiline mode since we want each line treated separately
  finalText = finalText.replace(/.*Listen to this article below.*$/m, '')
  // finalText

  // Now let's replace 🎃🎃🎃🎃👻👻👻👻 and 👻👻👻👻🎃🎃🎃🎃 with 4 new lines
  var four_new_lines = "\n\n\n\n"
  // 🎃🎃🎃🎃 .... 🎃🎃🎃🎃 will probably be the h1
  // and if there is some strong tag with very little or some problems or h tags with problems, just replace the lantern and ghost by new lines
  finalText = finalText.replace(/🎃+|👻+/g, four_new_lines)
  // finalText

  // strip the beginning and end of the string, like in Python
  // I got the idea from https://davidbieber.com/snippets/2020-12-26-pythons-strip-lstrip-and-rstrip-in-javascript/

  // remember that \s matches new line. It is the whitespace character.
  function strip_only_beginning_and_end(s) {
      // NOTE HERE I DO NOT WANT MULTILINE MODE
      return s.replace(/^\s+|\s+$/g, '');
    }

  finalText = strip_only_beginning_and_end(finalText)
  // finalText

  function break_length(sec) {
      return ` <break time='${sec}s'/>`
  }


  // function get_wp_post_text(h1_to_h3_tags_pause=2, h4_to_h6_tags_pause=1.5, li_tag_pause=1, strong_tag_pause=1)

  // h1_to_h3_tags_break = break_length(2)
  // h4_to_h6_tags_break = break_length(1.5)

  // li_tag_break = break_length(1)
  // strong_tag_break = break_length(1)

  h1_to_h3_tags_break = break_length(h1_to_h3_tags_pause)
  h4_to_h6_tags_break = break_length(h4_to_h6_tags_pause)

  li_tag_break = break_length(li_tag_pause)
  strong_tag_break = break_length(strong_tag_pause)


  // finalText

  // replace ⏰⏰⏰⏰🌞🌞🌞🌞 by 1 sec
  finalText = finalText.replace(/⏰⏰⏰⏰🌞🌞🌞🌞/g, h1_to_h3_tags_break)
  // finalText

  // replace 🌞🌞🌞🌞 by 1 sec
  finalText = finalText.replace(/🌞🌞🌞🌞/g, h1_to_h3_tags_break)
  // finalText

  // replace 🦄🦄🦄🦄 by 1.5 sec
  finalText = finalText.replace(/🦄🦄🦄🦄/g, h4_to_h6_tags_break)
  // finalText

  // replace 🌞🌞🌞🌞 by 1 sec
  finalText = finalText.replace(/⏱️⏱️⏱️⏱️/g, li_tag_break)
  // finalText

  // replace ⏰⏰⏰⏰ by 1 sec
  finalText = finalText.replace(/⏰⏰⏰⏰/g, strong_tag_break)
  // finalText

  // replace <break time='1s'/> <break time='1.5s'/> by <break time='1.5s'/>
  // make sure it is global
  var strong_h4_h6_regex = new RegExp(`${strong_tag_break}${h4_to_h6_tags_break}`, "g")
  finalText = finalText.replace(strong_h4_h6_regex, h4_to_h6_tags_break)
  // finalText


  // without g flag, it just takes first match
  // Add Watson Dog Products Dot Com at the top
  first_line_regex = new RegExp(/^(.*)$/m)
  finalText = finalText.replace(first_line_regex, `$1\n\n\n\nBy Watson Dog Products Dot Com ${h1_to_h3_tags_break}\n\n\n\n`)

  // finalText

  // replace 4 or more new lines by just 4 new lines
  // don't forget about dotall and also global
  finalText = finalText.replace(/\n\n\n\n+/gs, "\n\n\n\n")
  // finalText

  // so you'll just need to delete the first and last parentheses in the text

  // I can't think of every possible issue to deal with. From here, you'll need to manually inspect.
  // I can't think of every possible issue to deal with. From here, you'll need to manually inspect.
  // I can't think of every possible issue to deal with. From here, you'll need to manually inspect.
  // BUT MOST OF THE WORK SHOULD ALREADY BE DONE
  //   return finalText
  // additional clean up
//   Long Lines <break time='1.5s'/>
//  <break time='1s'/>
// I want above replace just by 1.5s (it has 2 breaks. I want only 1)
// 1.5 is special. I know that it is just for h4 to h6

  // I want to put a variable in the regex. I don't only want to support 1.5 and 1 second. I want to be able to support any
  // do non-greedy
  // use dot all so it could go over multiple lines and also global so it replaces every match
  var two_pauses_regex = new RegExp(`${h4_to_h6_tags_break}.*?${strong_tag_break}`, "sg")
  finalText = finalText.replace(two_pauses_regex, h4_to_h6_tags_break)
  return finalText
}


var text = get_wp_post_text()
text
// Long Lines <break time='1.5s'/>
// <break time='1s'/>

// h4_to_h6_tags_break .*? li_tag_break by h4_to_h6_tags_break
