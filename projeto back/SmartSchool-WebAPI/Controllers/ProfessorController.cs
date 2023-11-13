using Microsoft.AspNetCore.Mvc;
using SmartSchool_WebAPI.Data;
using SmartSchool_WebAPI.Models;

namespace SmartSchool_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly IRepository _repository;


        public ProfessorController(IRepository repository)
        {
            _repository = repository;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _repository.GetAllProfessoresAsync(true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("{ProfessorId}")]
        public async Task<IActionResult> GetByProfessorId(int ProfessorId)
        {
            try
            {
                var result = await _repository.GetProfessoresAsyncById(ProfessorId, true);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpGet("ByAluno/{alunoId}")]
        public async Task<IActionResult> GetByAlunoId(int alunoId)
        {
            try
            {
                var result = await _repository.GetProfessoresAsyncByAlunoId(alunoId, false);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Professor model)
        {
            try
            {
                _repository.Add(model);

                if(await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{ProfessorId}")]
        public async Task<IActionResult> Put(int ProfessorId, Professor model)
        {
            try
            {
                var prof = await _repository.GetProfessoresAsyncById(ProfessorId, false);
                
                if(prof == null) return NotFound("Professor não encontrado");

                _repository.Update(model);

                if(await _repository.SaveChangesAsync())
                {
                    return Ok(model);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

        [HttpDelete("{ProfessorId}")]
        public async Task<IActionResult> Delete(int ProfessorId)
        {
            try
            {
                var prof = await _repository.GetProfessoresAsyncById(ProfessorId, false);
                
                if(prof == null) return NotFound();

                _repository.Delete(prof);

                if(await _repository.SaveChangesAsync())
                {
                    return Ok(new { message = "Deletado" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro: {ex.Message}");
            }

            return BadRequest();
        }

    }
}