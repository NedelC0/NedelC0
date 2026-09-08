document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);

  var yearNode = document.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var topic = params.get('topic');
  var topicField = document.querySelector('[data-topic-field]');
  if (topic && topicField && !topicField.value) {
    topicField.value = topic;
  }

  var subjectField = document.querySelector('[data-subject-field]');
  if (subjectField) {
    var baseSubject = subjectField.getAttribute('data-base-subject') || subjectField.value;
    subjectField.value = topic ? baseSubject + ' - ' + topic : baseSubject;
  }

  var successBox = document.querySelector('[data-form-success]');
  if (successBox && params.get('sent') === '1') {
    successBox.hidden = false;
  }

  var revealNodes = document.querySelectorAll('.reveal');
  if (!revealNodes.length) {
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealNodes.forEach(function (node) {
    observer.observe(node);
  });
});
